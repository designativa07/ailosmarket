import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginUsuarioDto } from '../dto/login-usuario.dto';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // Diz ao Passport para usar 'email' como o campo de usuário
  }

  async validate(email: string, pass: string): Promise<Omit<Usuario, 'senhaHash'>> {
    const user = await this.authService.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas. Por favor, verifique seu email e senha.');
    }
    return user;
  }
} 