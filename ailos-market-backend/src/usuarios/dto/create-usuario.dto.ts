import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'O email fornecido é inválido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  senha: string;

  @IsEnum(UserRole, { message: 'O papel fornecido é inválido.' })
  @IsNotEmpty({ message: 'O papel não pode estar vazio.' })
  papel: UserRole;

  @IsString({ message: 'O nome completo deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome completo não pode estar vazio.' })
  nomeCompleto: string;

  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsOptional()
  telefone?: string;

  @IsString({ message: 'A URL da foto de perfil deve ser uma string.' })
  @IsOptional()
  fotoPerfilUrl?: string;
} 