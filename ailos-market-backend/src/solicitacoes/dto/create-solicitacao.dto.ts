import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSolicitacaoDto {
  @IsUUID('4', { message: 'ID do fornecedor deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'ID do fornecedor não pode estar vazio.' })
  fornecedorId: string; // usuarioId do PerfilFornecedor

  @IsOptional()
  @IsUUID('4', { message: 'ID do serviço/produto deve ser um UUID válido.' })
  servicoProdutoId?: string;

  @IsOptional()
  @IsString()
  mensagemInicial?: string;
} 