import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'perfis_administradores' })
export class PerfilAdministrador {
  @PrimaryColumn({ type: 'uuid' })
  usuarioId: string;

  @OneToOne(() => Usuario, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ nullable: true })
  cargo: string;
} 