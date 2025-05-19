import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, Min, IsUUID, IsBoolean } from 'class-validator';

export class CreateServicoProdutoDto {
  @IsUUID('4', { message: 'ID do fornecedor deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'ID do fornecedor não pode estar vazio.' })
  fornecedorId: string; // Será o usuarioId do PerfilFornecedor

  @IsString({ message: 'Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio.' })
  nome: string;

  @IsString({ message: 'Descrição detalhada deve ser uma string.' })
  @IsNotEmpty({ message: 'Descrição detalhada não pode estar vazia.' })
  descricaoDetalhada: string;

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
  ativo?: boolean; // Geralmente true por padrão na criação
  
  @IsOptional()
  @IsNumber({}, { message: 'ID da categoria deve ser um número inteiro.' })
  categoriaId?: number;
} 