import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { HomologationStatus } from '../entities/perfil-fornecedor.entity';

export class UpdateHomologacaoFornecedorDto {
  @IsEnum(HomologationStatus, { message: 'Status de homologação inválido.' })
  @IsNotEmpty({ message: 'O status de homologação não pode estar vazio.' })
  statusHomologacao: HomologationStatus;

  @IsOptional()
  @IsString()
  justificativaRejeicao?: string;
  
  // O administrador_homologador_id será pego do usuário autenticado (admin) no serviço.
} 