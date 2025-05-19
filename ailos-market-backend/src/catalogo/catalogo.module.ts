import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaServico } from './entities/categoria-servico.entity';
import { ServicoProduto } from './entities/servico-produto.entity';
import { CatalogoService } from './catalogo.service';
import { CatalogoController } from './catalogo.controller';
import { PerfisModule } from '../perfis/perfis.module';
import { AuthModule } from '../auth/auth.module';
import { CategoriaServicoService } from './categoria-servico.service';
import { CategoriaServicoController } from './categoria-servico.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriaServico,
      ServicoProduto,
    ]),
    PerfisModule,
    AuthModule,
  ],
  controllers: [CatalogoController, CategoriaServicoController],
  providers: [CatalogoService, CategoriaServicoService],
  exports: [CatalogoService, CategoriaServicoService],
})
export class CatalogoModule {} 