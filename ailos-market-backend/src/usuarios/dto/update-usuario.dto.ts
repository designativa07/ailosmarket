import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome completo deve ser uma string.' })
  nomeCompleto?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  telefone?: string;

  @IsOptional()
  @IsString({ message: 'A URL da foto de perfil deve ser uma string.' })
  fotoPerfilUrl?: string;

  // Campos que apenas um administrador pode querer alterar:
  @IsOptional()
  @IsBoolean({ message: 'O status ativo deve ser um booleano.' })
  ativo?: boolean; 
  
  // Não permitir alteração de email, senha ou papel por este DTO genérico.
  // Papel poderia ser alterado por um admin através de um endpoint específico, se necessário.
  // Email e senha devem ter fluxos próprios de alteração.
} 