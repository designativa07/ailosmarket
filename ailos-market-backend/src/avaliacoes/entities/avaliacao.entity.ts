import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { SolicitacaoServico } from '../../solicitacoes/entities/solicitacao-servico.entity';
import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { ServicoProduto } from '../../catalogo/entities/servico-produto.entity';

@Entity({ name: 'avaliacoes' })
export class Avaliacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'solicitacao_id', type: 'uuid', unique: true })
  solicitacaoId: string;

  // Relacionamento OneToOne: Uma solicitação tem uma avaliação
  @OneToOne(() => SolicitacaoServico, (solicitacao) => solicitacao.avaliacao, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'solicitacao_id' })
  solicitacao: SolicitacaoServico;

  @Column({ name: 'avaliador_id', type: 'uuid' })
  avaliadorId: string;

  @ManyToOne(() => PerfilCooperado, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'avaliador_id' })
  avaliador: PerfilCooperado;

  @Column({ name: 'avaliado_fornecedor_id', type: 'uuid' })
  avaliadoFornecedorId: string;

  @ManyToOne(() => PerfilFornecedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'avaliado_fornecedor_id' })
  avaliadoFornecedor: PerfilFornecedor;

  @Column({ name: 'avaliado_servico_produto_id', type: 'uuid', nullable: true })
  avaliadoServicoProdutoId: string;

  @ManyToOne(() => ServicoProduto, (servico) => servico.avaliacoesRecebidas, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'avaliado_servico_produto_id' })
  avaliadoServicoProduto: ServicoProduto;

  @Column({ type: 'integer' })
  nota: number; // CHECK (nota >= 1 AND nota <= 5) será tratado via validação ou constraint no DB

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn({ name: 'data_avaliacao', type: 'timestamptz' })
  dataAvaliacao: Date;
} 