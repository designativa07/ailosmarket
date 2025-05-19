import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { CategoriaServico } from './categoria-servico.entity';
import { SolicitacaoServico } from '../../solicitacoes/entities/solicitacao-servico.entity';
import { Avaliacao } from '../../avaliacoes/entities/avaliacao.entity';

@Entity({ name: 'servicos_produtos' })
export class ServicoProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fornecedor_id', type: 'uuid' })
  fornecedorId: string;

  @ManyToOne(() => PerfilFornecedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: PerfilFornecedor;

  @Column({ name: 'categoria_id', type: 'int', nullable: true })
  categoriaId: number;

  @ManyToOne(() => CategoriaServico, (categoria) => categoria.servicosProdutos, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaServico;

  @Column()
  nome: string;

  @Column({ name: 'descricao_detalhada', type: 'text' })
  descricaoDetalhada: string;

  @Column({ name: 'palavras_chave', type: 'text', array: true, nullable: true })
  palavrasChave: string[];

  @Column({ name: 'preco_base', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precoBase: number;

  @Column({ name: 'unidade_medida', length: 50, nullable: true })
  unidadeMedida: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'data_criacao', type: 'timestamptz' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamptz' })
  dataAtualizacao: Date;

  @OneToMany(() => SolicitacaoServico, (solicitacao) => solicitacao.servicoProduto)
  solicitacoesServicos: SolicitacaoServico[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.avaliadoServicoProduto)
  avaliacoesRecebidas: Avaliacao[];
} 