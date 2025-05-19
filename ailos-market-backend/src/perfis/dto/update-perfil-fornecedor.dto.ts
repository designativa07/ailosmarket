import { IsArray, IsOptional, IsString, Length, Matches, IsUrl } from 'class-validator';

export class UpdatePerfilFornecedorDto {
  // CNPJ e Razão Social geralmente não são alterados, mas se necessário, podem ser opcionais.
  // Por ora, vou assumir que não são alteráveis pelo próprio fornecedor após criação inicial.
  // Se forem, adicionar validações similares ao Create DTO.

  @IsOptional()
  @IsString({ message: 'O nome fantasia deve ser uma string.' })
  nomeFantasia?: string;

  @IsOptional()
  @IsString({ message: 'O endereço completo deve ser uma string.' })
  enderecoCompleto?: string;

  @IsOptional()
  @IsString({ message: 'A descrição da empresa deve ser uma string.' })
  descricaoEmpresa?: string;

  @IsOptional()
  @IsArray({ message: 'Segmentos de atuação deve ser um array de strings.' })
  @IsString({ each: true, message: 'Cada segmento de atuação deve ser uma string.' })
  segmentosAtuacao?: string[];

  @IsOptional()
  @IsArray({ message: 'URLs de certificações deve ser um array de strings.' })
  @IsUrl({}, { each: true, message: 'Cada certificação deve ser uma URL válida.' })
  certificacoesUrls?: string[];

  @IsOptional()
  @IsString({ message: 'Referências comerciais devem ser uma string.' })
  referenciasComerciais?: string;

  @IsOptional()
  @IsUrl({}, {message: 'URL do logo deve ser uma URL válida.'})
  logoUrl?: string;

  @IsOptional()
  documentosEnviados?: any; 
} 