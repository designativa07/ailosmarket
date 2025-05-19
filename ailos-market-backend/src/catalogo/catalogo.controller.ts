import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request as NestRequest, Query, ValidationPipe, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CreateServicoProdutoDto } from './dto/create-servico-produto.dto';
import { UpdateServicoProdutoDto } from './dto/update-servico-produto.dto';
import { ServicoProduto } from './entities/servico-produto.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, Usuario } from '../usuarios/entities/usuario.entity';

interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
  id: string;
  papel: UserRole;
}

@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  // Apenas Fornecedores podem criar. O serviço validará se o fornecedorId no DTO pertence ao usuário autenticado.
  // E se o perfil do fornecedor está homologado.
  @Roles(UserRole.FORNECEDOR) 
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreateServicoProdutoDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<ServicoProduto> {
    // O serviço `create` já verifica se req.user.id === dto.fornecedorId
    // e se o perfil do fornecedor está aprovado.
    return this.catalogoService.create(dto, req.user.id, req.user.papel);
  }

  @Get()
  async findAll(@Query('fornecedorId') fornecedorId?: string): Promise<ServicoProduto[]> {
    return this.catalogoService.findAll(fornecedorId);
  }

  @Get(':itemId')
  async findOne(@Param('itemId', ParseUUIDPipe) itemId: string): Promise<ServicoProduto | undefined> {
    return this.catalogoService.findOneByItemId(itemId);
  }

  @Patch(':itemId')
  @UseGuards(JwtAuthGuard) // RolesGuard não é necessário aqui pois a lógica está no serviço
  async update(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateServicoProdutoDto,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<ServicoProduto> {
    return this.catalogoService.update(itemId, dto, req.user.id, req.user.papel);
  }

  @Delete(':itemId')
  @UseGuards(JwtAuthGuard) // RolesGuard não é necessário aqui pois a lógica está no serviço
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @NestRequest() req: { user: AuthenticatedUser },
  ): Promise<void> {
    await this.catalogoService.remove(itemId, req.user.id, req.user.papel);
  }
} 