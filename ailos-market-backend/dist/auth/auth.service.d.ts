import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Omit<Usuario, 'senhaHash'> | null>;
    login(user: Omit<Usuario, 'senhaHash'>): Promise<{
        access_token: string;
    }>;
}
