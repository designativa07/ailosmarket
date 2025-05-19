import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findOneByEmail(email: string): Promise<Usuario | undefined>;
    findOneById(id: string): Promise<Omit<Usuario, 'senhaHash'> | undefined>;
    findOneByIdWithPassword(id: string): Promise<Usuario | undefined>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Omit<Usuario, 'senhaHash'>[]>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<Usuario, 'senhaHash'> | undefined>;
    remove(id: string): Promise<Omit<Usuario, 'senhaHash'> | undefined>;
}
