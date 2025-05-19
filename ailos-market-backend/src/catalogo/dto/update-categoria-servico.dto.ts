import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCategoriaServicoDto {
  @IsOptional()
  @IsString({ message: 'Nome da categoria deve ser uma string.' })
  nome?: string;

  @IsOptional()
  @IsString({ message: 'Descrição da categoria deve ser uma string.' })
  descricao?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser um booleano.' })
  ativo?: boolean;
} 