import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequestStatus } from '../entities/solicitacao-servico.entity';

export class UpdateStatusSolicitacaoDto {
  @IsEnum(RequestStatus, { message: 'Status da solicitação inválido.' })
  @IsNotEmpty({ message: 'O novo status da solicitação não pode estar vazio.' })
  status: RequestStatus;
} 