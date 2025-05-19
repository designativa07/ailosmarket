import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Param, ForbiddenException, NotFoundException, ParseUUIDPipe, Request as NestRequest, Patch, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario, UserRole } from './entities/usuario.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

// Interface para tipar o usuário no objeto de requisição após autenticação
interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
  id: string;
  papel: UserRole;
}

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Omitir senhaHash do retorno da criação também
    const newUser = await this.usuariosService.create(createUsuarioDto);
    const { senhaHash, ...result } = newUser;
    return result as Usuario; // O tipo Usuario aqui é um pouco enganoso, pois não terá senhaHash
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async findAll(): Promise<Omit<Usuario, 'senhaHash'>[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Apenas usuários autenticados podem tentar acessar
  async findOneById(
    @Param('id', ParseUUIDPipe) id: string,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<Omit<Usuario, 'senhaHash'> | null> {
    const authenticatedUser = req.user;

    // Admin pode ver qualquer perfil
    // Usuário normal só pode ver o seu próprio perfil
    if (authenticatedUser.papel !== UserRole.ADMINISTRADOR && authenticatedUser.id !== id) {
      throw new ForbiddenException('Você não tem permissão para acessar este perfil.');
    }

    const usuario = await this.usuariosService.findOneById(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return usuario;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateUsuarioDto: UpdateUsuarioDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<Omit<Usuario, 'senhaHash'> | null> {
    const authenticatedUser = req.user;

    // Admin pode atualizar qualquer perfil.
    // Usuário normal só pode atualizar o seu próprio perfil.
    if (authenticatedUser.papel !== UserRole.ADMINISTRADOR && authenticatedUser.id !== id) {
      throw new ForbiddenException('Você não tem permissão para atualizar este perfil.');
    }

    // Se o usuário não for admin e tentar modificar o campo 'ativo', proibir ou ignorar.
    // Neste caso, vamos remover o campo 'ativo' do DTO se o usuário não for admin.
    if (authenticatedUser.papel !== UserRole.ADMINISTRADOR) {
      if (typeof updateUsuarioDto.ativo !== 'undefined') {
        // Poderia lançar ForbiddenException ou simplesmente remover o campo.
        // Remover é mais silencioso e impede a alteração.
        delete updateUsuarioDto.ativo;
      }
    }

    const usuarioAtualizado = await this.usuariosService.update(id, updateUsuarioDto);
    if (!usuarioAtualizado) {
      throw new NotFoundException('Usuário não encontrado para atualização.');
    }
    return usuarioAtualizado;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<Usuario, 'senhaHash'> | null> {
    const usuarioDesativado = await this.usuariosService.remove(id);
    if (!usuarioDesativado) {
      throw new NotFoundException('Usuário não encontrado para remoção.');
    }
    return usuarioDesativado;
  }
} 