import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao]),
  ],
  // controllers: [], // Adicionar controllers de avaliações aqui
  // providers: [], // Adicionar serviços de avaliações aqui
  // exports: [], // Exportar serviços de avaliações aqui
})
export class AvaliacoesModule {} 