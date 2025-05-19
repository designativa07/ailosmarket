import { Injectable, NotFoundException, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicoProduto } from './entities/servico-produto.entity';
import { CreateServicoProdutoDto } from './dto/create-servico-produto.dto';
import { UpdateServicoProdutoDto } from './dto/update-servico-produto.dto';
import { PerfisService } from '../perfis/perfis.service';
import { HomologationStatus } from '../perfis/entities/perfil-fornecedor.entity';
import { Usuario } from '../usuarios/entities/usuario.entity'; // Para obter o UserRole.ADMINISTRADOR
import { UserRole } from '../usuarios/entities/usuario.entity'; // Import UserRole
import { CategoriaServicoService } from './categoria-servico.service'; // Importar
import { CategoriaServico } from './entities/categoria-servico.entity'; // Importar

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(ServicoProduto)
    private readonly servicoProdutoRepository: Repository<ServicoProduto>,
    private readonly perfisService: PerfisService, // Para buscar e validar o perfil do fornecedor
    private readonly categoriaService: CategoriaServicoService, // Injetar
  ) {}

  async create(dto: CreateServicoProdutoDto, solicitanteId: string, solicitantePapel: string): Promise<ServicoProduto> {
    const perfilFornecedor = await this.perfisService.findPerfilFornecedorByUsuarioId(dto.fornecedorId);

    if (!perfilFornecedor) {
      throw new NotFoundException(`Perfil de fornecedor com ID de usuário ${dto.fornecedorId} não encontrado.`);
    }

    // Verifica se o solicitante é o próprio dono do perfil de fornecedor
    if (solicitanteId !== perfilFornecedor.usuarioId) {
        throw new ForbiddenException('Você só pode adicionar itens de catálogo ao seu próprio perfil de fornecedor.');
    }

    // Verifica se o fornecedor está homologado (APROVADO)
    if (perfilFornecedor.statusHomologacao !== HomologationStatus.APROVADO) {
      throw new ForbiddenException('Seu perfil de fornecedor não está aprovado para adicionar itens ao catálogo.');
    }

    let categoria: CategoriaServico | null = null;
    if (dto.categoriaId) {
      const categoriaEncontrada = await this.categoriaService.findOneById(dto.categoriaId);
      if (!categoriaEncontrada || !categoriaEncontrada.ativo) {
        throw new BadRequestException(`Categoria com ID ${dto.categoriaId} não encontrada ou inativa.`);
      }
      categoria = categoriaEncontrada;
    }

    const novoItem = this.servicoProdutoRepository.create({
      ...dto,
      categoria: categoria, // Associar a entidade categoria
      ativo: dto.ativo !== undefined ? dto.ativo : true, // Default para true se não especificado
    });

    try {
      return await this.servicoProdutoRepository.save(novoItem);
    } catch (error) {
      console.error("Erro ao salvar item no catálogo: ", error);
      throw new InternalServerErrorException('Erro ao adicionar item ao catálogo.');
    }
  }

  async findAll(fornecedorId?: string): Promise<ServicoProduto[]> {
    if (fornecedorId) {
      return this.servicoProdutoRepository.find({
        where: { fornecedorId, ativo: true }, // Mostra apenas ativos do fornecedor
        relations: ['categoria'], // Opcional, se quiser detalhes da categoria
      });
    }
    // Retorna todos os itens ativos de todos os fornecedores
    return this.servicoProdutoRepository.find({ where: { ativo: true }, relations: ['categoria', 'fornecedor'] });
  }

  async findOneByItemId(itemId: string): Promise<ServicoProduto | undefined> {
    const item = await this.servicoProdutoRepository.findOne({ 
        where: { id: itemId, ativo: true }, 
        relations: ['fornecedor', 'categoria'] 
    });
    if (!item) {
        throw new NotFoundException(`Item do catálogo com ID ${itemId} não encontrado ou inativo.`);
    }
    return item;
  }

  async update(
    itemId: string, 
    dto: UpdateServicoProdutoDto, 
    solicitanteId: string, 
    solicitantePapel: UserRole
): Promise<ServicoProduto> {
    const item = await this.servicoProdutoRepository.findOne({ where: { id: itemId }, relations: ['fornecedor', 'categoria'] });
    if (!item) {
      throw new NotFoundException(`Item do catálogo com ID ${itemId} não encontrado.`);
    }

    // Verifica permissão: ou é o dono do item, ou é admin
    if (item.fornecedor.usuarioId !== solicitanteId && solicitantePapel !== UserRole.ADMINISTRADOR) {
      throw new ForbiddenException('Você não tem permissão para atualizar este item do catálogo.');
    }

    // Lógica para atualizar categoria
    if (dto.categoriaId === null) { // Desassociar categoria
        item.categoria = null;
        item.categoriaId = null;
    } else if (dto.categoriaId !== undefined) { // Associar ou mudar categoria
        const categoriaEncontrada = await this.categoriaService.findOneById(dto.categoriaId);
        if (!categoriaEncontrada || !categoriaEncontrada.ativo) {
            throw new BadRequestException(`Categoria com ID ${dto.categoriaId} não encontrada ou inativa.`);
        }
        item.categoria = categoriaEncontrada;
        item.categoriaId = categoriaEncontrada.id; // Garantir que o ID também seja atualizado
    }
    // Remover categoriaId do DTO para evitar que o merge tente processá-lo diretamente de forma incorreta
    const { categoriaId, ...updateData } = dto;

    this.servicoProdutoRepository.merge(item, updateData);
    try {
      return await this.servicoProdutoRepository.save(item);
    } catch (error) {
        console.error("Erro ao atualizar item no catálogo: ", error);
        throw new InternalServerErrorException('Erro ao atualizar item do catálogo.');
    }
  }

  async remove(itemId: string, solicitanteId: string, solicitantePapel: UserRole): Promise<void> {
    const item = await this.servicoProdutoRepository.findOne({ where: { id: itemId }, relations: ['fornecedor'] });
    if (!item) {
      throw new NotFoundException(`Item do catálogo com ID ${itemId} não encontrado.`);
    }

    if (item.fornecedor.usuarioId !== solicitanteId && solicitantePapel !== UserRole.ADMINISTRADOR) {
      throw new ForbiddenException('Você não tem permissão para remover este item do catálogo.');
    }

    item.ativo = false; // Soft delete
    try {
        await this.servicoProdutoRepository.save(item);
    } catch (error) {
        console.error("Erro ao remover item no catálogo: ", error);
        throw new InternalServerErrorException('Erro ao remover item do catálogo.');
    }
    // Para DELETE, geralmente não se retorna conteúdo ou se retorna um status 204 No Content.
    // Se precisar retornar o item desativado, pode fazer: return item;
  }
} 