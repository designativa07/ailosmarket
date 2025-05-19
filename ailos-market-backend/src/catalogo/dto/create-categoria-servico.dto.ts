import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoriaServicoDto {
  @IsString({ message: 'Nome da categoria deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome da categoria não pode estar vazio.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'Descrição da categoria deve ser uma string.' })
  descricao?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser um booleano.' })
  ativo?: boolean; // Default para true na criação
} 