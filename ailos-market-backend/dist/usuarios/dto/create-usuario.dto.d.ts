import { UserRole } from '../entities/usuario.entity';
export declare class CreateUsuarioDto {
    email: string;
    senha: string;
    papel: UserRole;
    nomeCompleto: string;
    telefone?: string;
    fotoPerfilUrl?: string;
}
