import { Injectable, ConflictException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, UserRole } from '../usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PerfilAdministrador } from './entities/perfil-administrador.entity';
import { PerfilCooperado } from './entities/perfil-cooperado.entity';
import { PerfilFornecedor } from './entities/perfil-fornecedor.entity';
import { CreatePerfilAdministradorDto } from './dto/create-perfil-administrador.dto';
import { CreatePerfilCooperadoDto } from './dto/create-perfil-cooperado.dto';
import { CreatePerfilFornecedorDto } from './dto/create-perfil-fornecedor.dto';
import { UpdatePerfilAdministradorDto } from './dto/update-perfil-administrador.dto';
import { UpdatePerfilCooperadoDto } from './dto/update-perfil-cooperado.dto';
import { UpdatePerfilFornecedorDto } from './dto/update-perfil-fornecedor.dto';
import { UpdateHomologacaoFornecedorDto } from './dto/update-homologacao-fornecedor.dto';
import { HomologationStatus } from './entities/perfil-fornecedor.entity';

@Injectable()
export class PerfisService {
  constructor(
    @InjectRepository(PerfilAdministrador)
    private readonly perfilAdminRepository: Repository<PerfilAdministrador>,
    @InjectRepository(PerfilCooperado)
    private readonly perfilCooperadoRepository: Repository<PerfilCooperado>,
    @InjectRepository(PerfilFornecedor)
    private readonly perfilFornecedorRepository: Repository<PerfilFornecedor>,
    private readonly usuariosService: UsuariosService, // Para validar o usuário e seu papel
  ) {}

  private async verificarUsuarioEConflitoDePerfil(usuarioId: string, papelEsperado: UserRole): Promise<Usuario> {
    const usuario = await this.usuariosService.findOneByIdWithPassword(usuarioId);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
    }
    if (usuario.papel !== papelEsperado) {
      throw new BadRequestException(`O usuário não tem o papel de ${papelEsperado} para criar este perfil.`);
    }

    // Verificar se já existe algum perfil para este usuário
    // Esta verificação é para a criação. Para atualização, o perfil já deve existir.
    const perfilAdmin = await this.perfilAdminRepository.findOne({where: {usuarioId}});
    const perfilCooperado = await this.perfilCooperadoRepository.findOne({where: {usuarioId}});
    const perfilFornecedor = await this.perfilFornecedorRepository.findOne({where: {usuarioId}});

    let perfilCount = 0;
    if (perfilAdmin) perfilCount++;
    if (perfilCooperado) perfilCount++;
    if (perfilFornecedor) perfilCount++;

    if (perfilCount > 1) {
        // Isso indicaria um problema de dados, um usuário não deveria ter múltiplos perfis
        console.error(`Usuário ${usuarioId} tem múltiplos perfis associados.`);
        throw new InternalServerErrorException('Conflito de dados de perfil para o usuário.');
    }
    
    // Para criação, se já existir UM perfil, é um conflito
    // A lógica original `if (usuario.perfilAdministrador || usuario.perfilCooperado || usuario.perfilFornecedor)` 
    // depende do carregamento eager das relações no findOneByIdWithPassword, o que não está acontecendo.
    // Por isso, a busca explícita acima é mais segura aqui.
    if (perfilCount === 1 && ( 
        (papelEsperado === UserRole.ADMINISTRADOR && !perfilAdmin) || 
        (papelEsperado === UserRole.COOPERADO && !perfilCooperado) || 
        (papelEsperado === UserRole.FORNECEDOR && !perfilFornecedor)
    )) {
        // Tentando criar um tipo de perfil quando outro já existe
        throw new ConflictException('Este usuário já possui um tipo diferente de perfil associado.');
    }

    return usuario;
  }

  async createPerfilAdministrador(dto: CreatePerfilAdministradorDto): Promise<PerfilAdministrador> {
    await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, UserRole.ADMINISTRADOR);
    
    const perfilExistente = await this.perfilAdminRepository.findOne({ where: { usuarioId: dto.usuarioId } });
    if (perfilExistente) {
      throw new ConflictException('Perfil de Administrador já existe para este usuário.');
    }

    try {
      const novoPerfil = this.perfilAdminRepository.create(dto);
      return await this.perfilAdminRepository.save(novoPerfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao criar o perfil de administrador.');
    }
  }

  async createPerfilCooperado(dto: CreatePerfilCooperadoDto): Promise<PerfilCooperado> {
    await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, UserRole.COOPERADO);

    const perfilExistente = await this.perfilCooperadoRepository.findOne({ where: { usuarioId: dto.usuarioId } });
    if (perfilExistente) {
      throw new ConflictException('Perfil de Cooperado já existe para este usuário.');
    }
    
    if (dto.cpfCnpj) {
        const comMesmoDoc = await this.perfilCooperadoRepository.findOne({where: {cpfCnpj: dto.cpfCnpj}});
        if(comMesmoDoc && comMesmoDoc.usuarioId !== dto.usuarioId) {
            throw new ConflictException('CPF/CNPJ já cadastrado para outro cooperado.');
        }
    }

    try {
      const novoPerfil = this.perfilCooperadoRepository.create(dto);
      return await this.perfilCooperadoRepository.save(novoPerfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao criar o perfil de cooperado.');
    }
  }

  async createPerfilFornecedor(dto: CreatePerfilFornecedorDto): Promise<PerfilFornecedor> {
    await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, UserRole.FORNECEDOR);

    const perfilExistente = await this.perfilFornecedorRepository.findOne({ where: { usuarioId: dto.usuarioId } });
    if (perfilExistente) {
      throw new ConflictException('Perfil de Fornecedor já existe para este usuário.');
    }

    const comMesmoCnpj = await this.perfilFornecedorRepository.findOne({where: {cnpj: dto.cnpj}});
    if(comMesmoCnpj && comMesmoCnpj.usuarioId !== dto.usuarioId){
        throw new ConflictException('CNPJ já cadastrado para outro fornecedor.');
    }

    try {
      const novoPerfil = this.perfilFornecedorRepository.create(dto);
      return await this.perfilFornecedorRepository.save(novoPerfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao criar o perfil de fornecedor.');
    }
  }

  async findPerfilAdministradorByUsuarioId(usuarioId: string): Promise<PerfilAdministrador | undefined> {
    return this.perfilAdminRepository.findOne({ where: { usuarioId } });
  }

  async findPerfilCooperadoByUsuarioId(usuarioId: string): Promise<PerfilCooperado | undefined> {
    return this.perfilCooperadoRepository.findOne({ where: { usuarioId } });
  }

  async findPerfilFornecedorByUsuarioId(usuarioId: string): Promise<PerfilFornecedor | undefined> {
    return this.perfilFornecedorRepository.findOne({ where: { usuarioId } , relations: ['usuario']});
  }

  // --- Métodos de UPDATE ---
  async updatePerfilAdministrador(usuarioId: string, dto: UpdatePerfilAdministradorDto): Promise<PerfilAdministrador> {
    const perfil = await this.perfilAdminRepository.findOne({ where: { usuarioId } });
    if (!perfil) {
      throw new NotFoundException('Perfil de Administrador não encontrado.');
    }
    this.perfilAdminRepository.merge(perfil, dto);
    try {
      return await this.perfilAdminRepository.save(perfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao atualizar o perfil de administrador.');
    }
  }

  async updatePerfilCooperado(usuarioId: string, dto: UpdatePerfilCooperadoDto): Promise<PerfilCooperado> {
    const perfil = await this.perfilCooperadoRepository.findOne({ where: { usuarioId } });
    if (!perfil) {
      throw new NotFoundException('Perfil de Cooperado não encontrado.');
    }

    if (dto.cpfCnpj && dto.cpfCnpj !== perfil.cpfCnpj) {
        const comMesmoDoc = await this.perfilCooperadoRepository.findOne({where: {cpfCnpj: dto.cpfCnpj}});
        if(comMesmoDoc && comMesmoDoc.usuarioId !== usuarioId) {
            throw new ConflictException('CPF/CNPJ já cadastrado para outro cooperado.');
        }
    }

    this.perfilCooperadoRepository.merge(perfil, dto);
    try {
      return await this.perfilCooperadoRepository.save(perfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao atualizar o perfil de cooperado.');
    }
  }

  async updatePerfilFornecedor(usuarioId: string, dto: UpdatePerfilFornecedorDto): Promise<PerfilFornecedor> {
    const perfil = await this.perfilFornecedorRepository.findOne({ where: { usuarioId } });
    if (!perfil) {
      throw new NotFoundException('Perfil de Fornecedor não encontrado.');
    }
    // Não estamos permitindo alteração de CNPJ aqui, mas se permitíssemos, a validação de unicidade seria necessária.
    this.perfilFornecedorRepository.merge(perfil, dto);
    try {
      return await this.perfilFornecedorRepository.save(perfil);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Erro ao atualizar o perfil de fornecedor.');
    }
  }
  
  // --- Gerenciamento de Homologação de Fornecedores (por Admin) ---
  async updateStatusHomologacaoFornecedor(
    fornecedorUsuarioId: string,
    adminHomologadorId: string,
    dto: UpdateHomologacaoFornecedorDto,
  ): Promise<PerfilFornecedor> {
    const perfilFornecedor = await this.perfilFornecedorRepository.findOne({ where: { usuarioId: fornecedorUsuarioId } });
    if (!perfilFornecedor) {
      throw new NotFoundException(`Perfil de Fornecedor com usuário ID ${fornecedorUsuarioId} não encontrado.`);
    }

    perfilFornecedor.statusHomologacao = dto.statusHomologacao;
    perfilFornecedor.justificativaRejeicao = dto.statusHomologacao === HomologationStatus.REJEITADO ? dto.justificativaRejeicao : null;
    perfilFornecedor.administradorHomologadorId = adminHomologadorId;
    perfilFornecedor.dataHomologacao = (dto.statusHomologacao === HomologationStatus.APROVADO || dto.statusHomologacao === HomologationStatus.REJEITADO) ? new Date() : null;
    perfilFornecedor.dataUltimaVerificacaoAdmin = new Date();

    try {
      return await this.perfilFornecedorRepository.save(perfilFornecedor);
    } catch (error) {
        console.error('Erro ao atualizar status de homologação:', error);
        throw new InternalServerErrorException('Erro ao atualizar status de homologação do fornecedor.');
    }
  }
} 