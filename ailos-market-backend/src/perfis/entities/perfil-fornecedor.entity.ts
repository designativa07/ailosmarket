import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export enum HomologationStatus {
  PENDENTE = 'PENDENTE',
  EM_ANALISE = 'EM_ANALISE',
  APROVADO = 'APROVADO',
  REJEITADO = 'REJEITADO',
}

@Entity({ name: 'perfis_fornecedores' })
export class PerfilFornecedor {
  @PrimaryColumn({ type: 'uuid' })
  usuarioId: string;

  @OneToOne(() => Usuario, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ length: 18, unique: true })
  cnpj: string;

  @Column({ name: 'razao_social' })
  razaoSocial: string;

  @Column({ name: 'nome_fantasia', nullable: true })
  nomeFantasia: string;

  @Column({ name: 'endereco_completo', type: 'text', nullable: true })
  enderecoCompleto: string;

  @Column({ name: 'descricao_empresa', type: 'text', nullable: true })
  descricaoEmpresa: string;

  @Column({ name: 'segmentos_atuacao', type: 'text', array: true, nullable: true })
  segmentosAtuacao: string[];

  @Column({ name: 'certificacoes_urls', type: 'text', array: true, nullable: true })
  certificacoesUrls: string[];

  @Column({ name: 'referencias_comerciais', type: 'text', nullable: true })
  referenciasComerciais: string;

  @Column({
    name: 'status_homologacao',
    type: 'enum',
    enum: HomologationStatus,
    default: HomologationStatus.PENDENTE,
  })
  statusHomologacao: HomologationStatus;

  @Column({ name: 'justificativa_rejeicao', type: 'text', nullable: true })
  justificativaRejeicao: string;

  @CreateDateColumn({ name: 'data_solicitacao_homologacao', type: 'timestamptz' })
  dataSolicitacaoHomologacao: Date;

  @Column({ name: 'data_homologacao', type: 'timestamptz', nullable: true })
  dataHomologacao: Date;

  @Column({ name: 'administrador_homologador_id', type: 'uuid', nullable: true })
  administradorHomologadorId: string; 
  // TODO: Estabelecer FK com Usuario (administrador) se necessário aqui ou via serviço

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string;

  @Column({ name: 'documentos_enviados', type: 'jsonb', nullable: true })
  documentosEnviados: any; // Ou um tipo mais específico se soubermos a estrutura

  @Column({ name: 'data_ultima_verificacao_admin', type: 'timestamptz', nullable: true })
  dataUltimaVerificacaoAdmin: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamptz' })
  dataAtualizacao: Date;
} 