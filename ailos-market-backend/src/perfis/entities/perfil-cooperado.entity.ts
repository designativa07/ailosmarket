import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'perfis_cooperados' })
export class PerfilCooperado {
  @PrimaryColumn({ type: 'uuid' })
  usuarioId: string;

  @OneToOne(() => Usuario, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'cpf_cnpj', length: 18, unique: true, nullable: true })
  cpfCnpj: string;

  @Column({ name: 'razao_social', nullable: true })
  razaoSocial: string;

  @Column({ name: 'nome_fantasia', nullable: true })
  nomeFantasia: string;

  @Column({ name: 'data_associacao', type: 'date', nullable: true })
  dataAssociacao: Date;
} 