import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ValidationPipe, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriaServicoService } from './categoria-servico.service';
import { CreateCategoriaServicoDto } from './dto/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dto/update-categoria-servico.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../usuarios/entities/usuario.entity';
import { CategoriaServico } from './entities/categoria-servico.entity';

@Controller('catalogo/categorias')
export class CategoriaServicoController {
  constructor(private readonly categoriaService: CategoriaServicoService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreateCategoriaServicoDto): Promise<CategoriaServico> {
    return this.categoriaService.create(dto);
  }

  @Get()
  findAll(@Query('incluirInativas') incluirInativas?: string): Promise<CategoriaServico[]> {
    const apenasAtivas = incluirInativas !== 'true';
    return this.categoriaService.findAll(apenasAtivas);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoriaServico | undefined> {
    return this.categoriaService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateCategoriaServicoDto,
  ): Promise<CategoriaServico> {
    return this.categoriaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.remove(id);
  }
} 