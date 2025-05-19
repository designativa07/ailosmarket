import { IsString, IsOptional, IsArray, IsNumber, Min, IsBoolean } from 'class-validator';

export class UpdateServicoProdutoDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string.' })
  nome?: string;

  @IsOptional()
  @IsString({ message: 'Descrição detalhada deve ser uma string.' })
  descricaoDetalhada?: string;

  @IsOptional()
  @IsArray({ message: 'Palavras-chave devem ser um array de strings.' })
  @IsString({ each: true, message: 'Cada palavra-chave deve ser uma string.' })
  palavrasChave?: string[];

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Preço base deve ser um número com até 2 casas decimais.' })
  @Min(0, { message: 'Preço base não pode ser negativo.' })
  precoBase?: number;

  @IsOptional()
  @IsString({ message: 'Unidade de medida deve ser uma string.' })
  unidadeMedida?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser um booleano.' })
  ativo?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'ID da categoria deve ser um número inteiro.' })
  categoriaId?: number | null;
} 