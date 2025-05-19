import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../usuarios/entities/usuario.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Nenhum papel é necessário, acesso permitido
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as Omit<Usuario, 'senhaHash'> & { papel: UserRole }; // Tipagem mais precisa do usuário no request

    if (!user || !user.papel) {
      return false; // Usuário não autenticado ou sem papel definido
    }

    return requiredRoles.some((role) => user.papel === role);
  }
} 