import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario, UserRole } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
    id: string;
    papel: UserRole;
}
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Omit<Usuario, 'senhaHash'>[]>;
    findOneById(id: string, req: {
        user: AuthenticatedUser;
    }): Promise<Omit<Usuario, 'senhaHash'> | null>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto, req: {
        user: AuthenticatedUser;
    }): Promise<Omit<Usuario, 'senhaHash'> | null>;
    remove(id: string): Promise<Omit<Usuario, 'senhaHash'> | null>;
}
export {};
