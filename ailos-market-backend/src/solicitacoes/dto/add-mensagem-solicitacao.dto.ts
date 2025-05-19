import { IsString, IsNotEmpty } from 'class-validator';

export class AddMensagemSolicitacaoDto {
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo da mensagem não pode estar vazio.' })
  conteudo: string;
} 