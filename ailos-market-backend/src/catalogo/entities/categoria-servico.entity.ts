import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ServicoProduto } from './servico-produto.entity';

@Entity({ name: 'categorias_servicos' })
export class CategoriaServico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'data_criacao', type: 'timestamptz' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamptz' })
  dataAtualizacao: Date;

  @OneToMany(() => ServicoProduto, (servicoProduto) => servicoProduto.categoria)
  servicosProdutos: ServicoProduto[];
} 