import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitacaoServico } from './solicitacao-servico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'mensagens_solicitacoes' })
export class MensagemSolicitacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'solicitacao_id', type: 'uuid' })
  solicitacaoId: string;

  @ManyToOne(() => SolicitacaoServico, (solicitacao) => solicitacao.mensagens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'solicitacao_id' })
  solicitacao: SolicitacaoServico;

  @Column({ name: 'remetente_id', type: 'uuid' })
  remetenteId: string;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' }) // Remetente pode ser Cooperado ou Fornecedor
  @JoinColumn({ name: 'remetente_id' })
  remetente: Usuario;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ default: false })
  lida: boolean;

  @CreateDateColumn({ name: 'data_envio', type: 'timestamptz' })
  dataEnvio: Date;
} 