import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicacaoCooperado } from './entities/indicacao-cooperado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndicacaoCooperado]),
  ],
  // controllers: [], // Adicionar controllers de indicações aqui
  // providers: [], // Adicionar serviços de indicações aqui
  // exports: [], // Exportar serviços de indicações aqui
})
export class IndicacoesModule {} 