import { Controller, Post, Body, UseGuards, Request as NestRequest, ValidationPipe, Get, Param, ParseUUIDPipe, ForbiddenException, NotFoundException, Patch } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { CreatePerfilAdministradorDto } from './dto/create-perfil-administrador.dto';
import { CreatePerfilCooperadoDto } from './dto/create-perfil-cooperado.dto';
import { CreatePerfilFornecedorDto } from './dto/create-perfil-fornecedor.dto';
import { UpdatePerfilAdministradorDto } from './dto/update-perfil-administrador.dto';
import { UpdatePerfilCooperadoDto } from './dto/update-perfil-cooperado.dto';
import { UpdatePerfilFornecedorDto } from './dto/update-perfil-fornecedor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Usuario, UserRole } from '../usuarios/entities/usuario.entity';
import { PerfilAdministrador } from './entities/perfil-administrador.entity';
import { PerfilCooperado } from './entities/perfil-cooperado.entity';
import { PerfilFornecedor } from './entities/perfil-fornecedor.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateHomologacaoFornecedorDto } from './dto/update-homologacao-fornecedor.dto';

interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
  id: string;
  papel: UserRole;
}

@Controller('perfis')
@UseGuards(JwtAuthGuard) // Proteger todos os endpoints deste controller
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  // --- Criação de Perfis ---
  @Post('administrador')
  async createPerfilAdministrador(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreatePerfilAdministradorDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilAdministrador> {
    if (req.user.id !== dto.usuarioId || req.user.papel !== UserRole.ADMINISTRADOR) {
      throw new ForbiddenException('Você não tem permissão para criar este perfil de administrador ou o ID do usuário não corresponde.');
    }
    return this.perfisService.createPerfilAdministrador(dto);
  }

  @Post('cooperado')
  async createPerfilCooperado(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreatePerfilCooperadoDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilCooperado> {
    if (req.user.id !== dto.usuarioId || req.user.papel !== UserRole.COOPERADO) {
      throw new ForbiddenException('Você não tem permissão para criar este perfil de cooperado ou o ID do usuário não corresponde.');
    }
    return this.perfisService.createPerfilCooperado(dto);
  }

  @Post('fornecedor')
  async createPerfilFornecedor(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreatePerfilFornecedorDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilFornecedor> {
    if (req.user.id !== dto.usuarioId || req.user.papel !== UserRole.FORNECEDOR) {
      throw new ForbiddenException('Você não tem permissão para criar este perfil de fornecedor ou o ID do usuário não corresponde.');
    }
    return this.perfisService.createPerfilFornecedor(dto);
  }

  // --- Busca de Perfis --- 
  @Get('meu-perfil')
  async getMeuPerfil(@NestRequest() req: { user: AuthenticatedUser }): Promise<any> {
    const { id, papel } = req.user;
    let perfil;
    switch (papel) {
      case UserRole.ADMINISTRADOR:
        perfil = await this.perfisService.findPerfilAdministradorByUsuarioId(id);
        break;
      case UserRole.COOPERADO:
        perfil = await this.perfisService.findPerfilCooperadoByUsuarioId(id);
        break;
      case UserRole.FORNECEDOR:
        perfil = await this.perfisService.findPerfilFornecedorByUsuarioId(id);
        break;
      default:
        throw new NotFoundException('Tipo de perfil desconhecido.');
    }
    if (!perfil) {
      throw new NotFoundException('Perfil não encontrado para o usuário autenticado.');
    }
    return perfil;
  }

  @Get('fornecedor/:usuarioId')
  async getPerfilFornecedor(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilFornecedor> {
    if (req.user.papel === UserRole.FORNECEDOR && req.user.id !== usuarioId) {
        throw new ForbiddenException('Fornecedores só podem buscar o próprio perfil por este endpoint.');
    }
    if (req.user.papel !== UserRole.FORNECEDOR && req.user.papel !== UserRole.ADMINISTRADOR) {
        throw new ForbiddenException('Acesso não autorizado.');
    }
    const perfil = await this.perfisService.findPerfilFornecedorByUsuarioId(usuarioId);
    if (!perfil) {
      throw new NotFoundException(`Perfil de fornecedor não encontrado para o usuário ID: ${usuarioId}`);
    }
    return perfil;
  }

  // --- Atualização de Perfis ---
  @Patch('administrador/:usuarioId')
  async updatePerfilAdministrador(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdatePerfilAdministradorDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilAdministrador> {
    if (req.user.id !== usuarioId || req.user.papel !== UserRole.ADMINISTRADOR) {
      throw new ForbiddenException('Você não tem permissão para atualizar este perfil de administrador.');
    }
    return this.perfisService.updatePerfilAdministrador(usuarioId, dto);
  }

  @Patch('cooperado/:usuarioId')
  async updatePerfilCooperado(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdatePerfilCooperadoDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilCooperado> {
    if (req.user.id !== usuarioId || req.user.papel !== UserRole.COOPERADO) {
      throw new ForbiddenException('Você não tem permissão para atualizar este perfil de cooperado.');
    }
    return this.perfisService.updatePerfilCooperado(usuarioId, dto);
  }

  @Patch('fornecedor/:usuarioId')
  async updatePerfilFornecedor(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdatePerfilFornecedorDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<PerfilFornecedor> {
    if (req.user.id !== usuarioId || req.user.papel !== UserRole.FORNECEDOR) {
      throw new ForbiddenException('Você não tem permissão para atualizar este perfil de fornecedor.');
    }
    return this.perfisService.updatePerfilFornecedor(usuarioId, dto);
  }

  // --- Gerenciamento de Homologação de Fornecedores (por Admin) ---
  @Patch('fornecedor/:fornecedorUsuarioId/homologacao')
  @UseGuards(RolesGuard) // JwtAuthGuard já está aplicado no nível do controller
  @Roles(UserRole.ADMINISTRADOR)
  async updateStatusHomologacao(
    @Param('fornecedorUsuarioId', ParseUUIDPipe) fornecedorUsuarioId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateHomologacaoFornecedorDto,
    @NestRequest() req: { user: AuthenticatedUser }, // Para pegar o ID do admin autenticado
  ): Promise<PerfilFornecedor> {
    const adminHomologadorId = req.user.id;
    return this.perfisService.updateStatusHomologacaoFornecedor(fornecedorUsuarioId, adminHomologadorId, dto);
  }

  // TODO: Adicionar endpoints para ADMIN gerenciar homologação de fornecedores
} 