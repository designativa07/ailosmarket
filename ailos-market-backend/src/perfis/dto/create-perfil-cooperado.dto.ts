import { IsOptional, IsString, IsUUID, Length, Matches, IsDateString } from 'class-validator';

export class CreatePerfilCooperadoDto {
  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido.' })
  usuarioId: string;

  @IsOptional()
  @IsString({ message: 'CPF/CNPJ deve ser uma string.' })
  @Length(11, 18, { message: 'CPF/CNPJ deve ter entre 11 e 18 caracteres.' })
  // Regex simples para validar CPF (11 dígitos) ou CNPJ (14 dígitos), pode ser mais robusto
  @Matches(/^(\d{11}|\d{14})$/, { message: 'CPF/CNPJ inválido.' })
  cpfCnpj?: string;

  @IsOptional()
  @IsString({ message: 'A razão social deve ser uma string.' })
  razaoSocial?: string;

  @IsOptional()
  @IsString({ message: 'O nome fantasia deve ser uma string.' })
  nomeFantasia?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de associação deve ser uma data válida.' })
  dataAssociacao?: Date;
} 