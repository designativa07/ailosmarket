import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Usuario } from '../../usuarios/entities/usuario.entity';

interface JwtPayload {
  sub: string;
  email: string;
  papel: string;
  // Adicione quaisquer outros campos que você incluir no payload do JWT
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuariosService, // Para buscar o usuário completo, se necessário
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<Usuario, 'senhaHash'> | null> {
    // O payload aqui é o que foi assinado no método login do AuthService
    // Você pode optar por buscar o usuário no banco de dados aqui para obter informações mais recentes
    // ou simplesmente retornar o payload, dependendo dos seus requisitos de segurança e dados.
    const user = await this.usuariosService.findOneById(payload.sub);
    if (!user || !user.ativo) {
        // Usuário não encontrado ou inativo
        throw new UnauthorizedException('Token inválido ou usuário desativado.');
    }
    const { senhaHash, ...result } = user;
    return result; // Garante que a senha hasheada não seja exposta
  }
} 