import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<Usuario, 'senhaHash'> | null> {
    const user = await this.usuariosService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.senhaHash)) {
      const { senhaHash, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      return result;
    }
    return null;
  }

  async login(user: Omit<Usuario, 'senhaHash'>) {
    const payload = { email: user.email, sub: user.id, papel: user.papel };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 