import { PerfilAdministrador } from '../../perfis/entities/perfil-administrador.entity';
import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
export declare enum UserRole {
    ADMINISTRADOR = "ADMINISTRADOR",
    COOPERADO = "COOPERADO",
    FORNECEDOR = "FORNECEDOR"
}
export declare class Usuario {
    id: string;
    email: string;
    senhaHash: string;
    papel: UserRole;
    nomeCompleto: string;
    telefone: string;
    ativo: boolean;
    fotoPerfilUrl: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
    perfilAdministrador?: PerfilAdministrador;
    perfilCooperado?: PerfilCooperado;
    perfilFornecedor?: PerfilFornecedor;
}
