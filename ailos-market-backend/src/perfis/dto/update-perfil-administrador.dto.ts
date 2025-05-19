import { IsOptional, IsString } from 'class-validator';

export class UpdatePerfilAdministradorDto {
  @IsOptional()
  @IsString({ message: 'O cargo deve ser uma string.' })
  cargo?: string;
} 