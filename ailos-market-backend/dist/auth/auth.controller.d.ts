import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: Omit<Usuario, 'senhaHash'>;
    }, loginDto: LoginUsuarioDto): Promise<{
        access_token: string;
    }>;
}
