import { IsArray, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches, IsUrl } from 'class-validator';

export class CreatePerfilFornecedorDto {
  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  usuarioId: string;

  @IsString({ message: 'CNPJ deve ser uma string.' })
  @Length(14, 14, { message: 'CNPJ deve ter 14 caracteres.' })
  @Matches(/^\d{14}$/, { message: 'CNPJ inválido. Forneça apenas os números.' })
  @IsNotEmpty({ message: 'O CNPJ não pode estar vazio.' })
  cnpj: string;

  @IsString({ message: 'A razão social deve ser uma string.' })
  @IsNotEmpty({ message: 'A razão social não pode estar vazia.' })
  razaoSocial: string;

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
  // Poderíamos usar uma validação mais específica para JSON se a estrutura fosse conhecida
  // @IsJSON({ message: 'Documentos enviados devem estar em formato JSON.' })
  documentosEnviados?: any; 
} 