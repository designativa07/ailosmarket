import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../usuarios/entities/usuario.entity'; // Ajuste o caminho se necessário

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles); 