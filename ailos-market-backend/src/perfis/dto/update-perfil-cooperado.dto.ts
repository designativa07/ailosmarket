import { IsOptional, IsString, Length, Matches, IsDateString } from 'class-validator';

export class UpdatePerfilCooperadoDto {
  @IsOptional()
  @IsString({ message: 'CPF/CNPJ deve ser uma string.' })
  @Length(11, 18, { message: 'CPF/CNPJ deve ter entre 11 e 18 caracteres.' })
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