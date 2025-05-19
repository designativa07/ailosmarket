import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SubmitPropostaDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Valor da proposta deve ser um número com até 2 casas decimais.' })
  @Min(0, { message: 'Valor da proposta não pode ser negativo.' })
  propostaValor?: number;

  @IsOptional()
  @IsString()
  propostaDetalhes?: string;
} 