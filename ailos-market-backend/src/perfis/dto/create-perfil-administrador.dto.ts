import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePerfilAdministradorDto {
  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido.' })
  usuarioId: string;

  @IsOptional()
  @IsString({ message: 'O cargo deve ser uma string.' })
  cargo?: string;
} 