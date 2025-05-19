import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PerfilAdministrador } from '../../perfis/entities/perfil-administrador.entity';
import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';

export enum UserRole {
  ADMINISTRADOR = 'ADMINISTRADOR',
  COOPERADO = 'COOPERADO',
  FORNECEDOR = 'FORNECEDOR',
}

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'senha_hash' })
  @Exclude({ toPlainOnly: true }) // Não expor a senha em respostas
  senhaHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  papel: UserRole;

  @Column({ name: 'nome_completo', nullable: true })
  nomeCompleto: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ name: 'foto_perfil_url', type: 'text', nullable: true })
  fotoPerfilUrl: string;

  @CreateDateColumn({ name: 'data_criacao', type: 'timestamptz' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamptz' })
  dataAtualizacao: Date;

  @OneToOne(() => PerfilAdministrador, (perfil) => perfil.usuario, { cascade: true, eager: false })
  perfilAdministrador?: PerfilAdministrador;

  @OneToOne(() => PerfilCooperado, (perfil) => perfil.usuario, { cascade: true, eager: false })
  perfilCooperado?: PerfilCooperado;

  @OneToOne(() => PerfilFornecedor, (perfil) => perfil.usuario, { cascade: true, eager: false })
  perfilFornecedor?: PerfilFornecedor;
} 