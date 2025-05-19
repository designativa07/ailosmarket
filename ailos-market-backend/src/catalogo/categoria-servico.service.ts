import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaServico } from './entities/categoria-servico.entity';
import { CreateCategoriaServicoDto } from './dto/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dto/update-categoria-servico.dto';

@Injectable()
export class CategoriaServicoService {
  constructor(
    @InjectRepository(CategoriaServico)
    private readonly categoriaRepository: Repository<CategoriaServico>,
  ) {}

  async create(dto: CreateCategoriaServicoDto): Promise<CategoriaServico> {
    const { nome } = dto;
    const existente = await this.categoriaRepository.findOne({ where: { nome } });
    if (existente) {
      throw new ConflictException(`Categoria com nome "${nome}" já existe.`);
    }

    const categoria = this.categoriaRepository.create({
      ...dto,
      ativo: dto.ativo !== undefined ? dto.ativo : true,
    });

    try {
      return await this.categoriaRepository.save(categoria);
    } catch (error) {
        console.error("Erro ao criar categoria: ", error);
        throw new InternalServerErrorException('Erro ao criar categoria de serviço/produto.');
    }
  }

  async findAll(apenasAtivas: boolean = true): Promise<CategoriaServico[]> {
    const whereClause = apenasAtivas ? { ativo: true } : {};
    return this.categoriaRepository.find({ where: whereClause, order: { nome: 'ASC' } });
  }

  async findOneById(id: number): Promise<CategoriaServico | undefined> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaServicoDto): Promise<CategoriaServico> {
    const categoria = await this.findOneById(id); // Reutiliza a busca e o NotFoundException

    if (dto.nome && dto.nome !== categoria.nome) {
      const existenteComMesmoNome = await this.categoriaRepository.findOne({ where: { nome: dto.nome } });
      if (existenteComMesmoNome && existenteComMesmoNome.id !== id) {
        throw new ConflictException(`Outra categoria com nome "${dto.nome}" já existe.`);
      }
    }

    this.categoriaRepository.merge(categoria, dto);
    try {
      return await this.categoriaRepository.save(categoria);
    } catch (error) {
        console.error("Erro ao atualizar categoria: ", error);
        throw new InternalServerErrorException('Erro ao atualizar categoria de serviço/produto.');
    }
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOneById(id);
    
    // Soft delete: apenas desativa a categoria
    categoria.ativo = false;
    try {
        await this.categoriaRepository.save(categoria);
    } catch (error) {
        console.error("Erro ao desativar categoria: ", error);
        throw new InternalServerErrorException('Erro ao desativar categoria de serviço/produto.');
    }
    // Considerar o que fazer com ServicoProduto que usam esta categoria.
    // A relação é onDelete: 'SET NULL', então o TypeORM deve cuidar disso no banco.
    // Se fosse um hard delete: await this.categoriaRepository.delete(id);
    // que retornaria DeleteResult. Aqui, como é soft delete, não há retorno específico.
  }
} 