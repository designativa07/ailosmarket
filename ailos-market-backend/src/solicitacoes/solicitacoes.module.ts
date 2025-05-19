import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacaoServico } from './entities/solicitacao-servico.entity';
import { MensagemSolicitacao } from './entities/mensagem-solicitacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitacaoServico,
      MensagemSolicitacao,
    ]),
  ],
  // controllers: [], // Adicionar controllers de solicitações aqui
  // providers: [], // Adicionar serviços de solicitações aqui
  // exports: [], // Exportar serviços de solicitações aqui
})
export class SolicitacoesModule {} 