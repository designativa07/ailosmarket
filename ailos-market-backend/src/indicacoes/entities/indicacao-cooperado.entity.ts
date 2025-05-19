import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity'; // Para o administrador_responsavel_id

export enum IndicationStatus {
  PENDENTE = 'PENDENTE',
  EM_ANALISE = 'EM_ANALISE',
  CONTATADO = 'CONTATADO',
  CONVERTIDO = 'CONVERTIDO',
  NAO_CONVERTIDO = 'NAO_CONVERTIDO',
}

@Entity({ name: 'indicacoes_cooperados' })
export class IndicacaoCooperado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fornecedor_indicador_id', type: 'uuid' })
  fornecedorIndicadorId: string;

  @ManyToOne(() => PerfilFornecedor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fornecedor_indicador_id' })
  fornecedorIndicador: PerfilFornecedor;

  @Column({ name: 'nome_empresa_indicada' })
  nomeEmpresaIndicada: string;

  @Column({ name: 'cnpj_indicado', length: 18, nullable: true })
  cnpjIndicado: string;

  @Column({ name: 'nome_contato_indicado', nullable: true })
  nomeContatoIndicado: string;

  @Column({ name: 'telefone_contato_indicado', length: 20, nullable: true })
  telefoneContatoIndicado: string;

  @Column({ name: 'email_contato_indicado', nullable: true })
  emailContatoIndicado: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @Column({
    type: 'enum',
    enum: IndicationStatus,
    default: IndicationStatus.PENDENTE,
  })
  status: IndicationStatus;

  @CreateDateColumn({ name: 'data_indicacao', type: 'timestamptz' })
  dataIndicacao: Date;

  @UpdateDateColumn({ name: 'data_ultima_atualizacao_status', type: 'timestamptz' })
  dataUltimaAtualizacaoStatus: Date;

  @Column({ name: 'administrador_responsavel_id', type: 'uuid', nullable: true })
  administradorResponsavelId: string;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'administrador_responsavel_id' })
  administradorResponsavel: Usuario;
} 