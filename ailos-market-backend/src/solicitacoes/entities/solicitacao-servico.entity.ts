import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { ServicoProduto } from '../../catalogo/entities/servico-produto.entity';
import { MensagemSolicitacao } from './mensagem-solicitacao.entity';
import { Avaliacao } from '../../avaliacoes/entities/avaliacao.entity';

export enum RequestStatus {
  NOVA = 'NOVA',
  EM_ANALISE_FORNECEDOR = 'EM_ANALISE_FORNECEDOR',
  PROPOSTA_ENVIADA = 'PROPOSTA_ENVIADA',
  ACEITA_COOPERADO = 'ACEITA_COOPERADO',
  RECUSADA_COOPERADO = 'RECUSADA_COOPERADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

@Entity({ name: 'solicitacoes_servicos' })
export class SolicitacaoServico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cooperado_id', type: 'uuid' })
  cooperadoId: string;

  @ManyToOne(() => PerfilCooperado, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cooperado_id' })
  cooperado: PerfilCooperado;

  @Column({ name: 'fornecedor_id', type: 'uuid' })
  fornecedorId: string;

  @ManyToOne(() => PerfilFornecedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: PerfilFornecedor;

  @Column({ name: 'servico_produto_id', type: 'uuid', nullable: true })
  servicoProdutoId: string;

  @ManyToOne(() => ServicoProduto, (servico) => servico.solicitacoesServicos, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'servico_produto_id' })
  servicoProduto: ServicoProduto;

  @Column({ name: 'mensagem_inicial', type: 'text', nullable: true })
  mensagemInicial: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.NOVA,
  })
  status: RequestStatus;

  @CreateDateColumn({ name: 'data_solicitacao', type: 'timestamptz' })
  dataSolicitacao: Date;

  @UpdateDateColumn({ name: 'data_ultima_atualizacao_status', type: 'timestamptz' })
  dataUltimaAtualizacaoStatus: Date;

  @Column({ name: 'data_conclusao', type: 'timestamptz', nullable: true })
  dataConclusao: Date;

  @Column({ name: 'historico_status', type: 'jsonb', nullable: true })
  historicoStatus: any;

  @Column({ name: 'proposta_valor', type: 'decimal', precision: 10, scale: 2, nullable: true })
  propostaValor: number;

  @Column({ name: 'proposta_detalhes', type: 'text', nullable: true })
  propostaDetalhes: string;

  @Column({ name: 'data_envio_proposta', type: 'timestamptz', nullable: true })
  dataEnvioProposta: Date;

  @Column({ name: 'data_resposta_proposta', type: 'timestamptz', nullable: true })
  dataRespostaProposta: Date;

  @OneToMany(() => MensagemSolicitacao, (mensagem) => mensagem.solicitacao)
  mensagens: MensagemSolicitacao[];

  @OneToOne(() => Avaliacao, (avaliacao) => avaliacao.solicitacao)
  avaliacao: Avaliacao;
} 