import { PerfisService } from './perfis.service';
import { CreatePerfilAdministradorDto } from './dto/create-perfil-administrador.dto';
import { CreatePerfilCooperadoDto } from './dto/create-perfil-cooperado.dto';
import { CreatePerfilFornecedorDto } from './dto/create-perfil-fornecedor.dto';
import { UpdatePerfilAdministradorDto } from './dto/update-perfil-administrador.dto';
import { UpdatePerfilCooperadoDto } from './dto/update-perfil-cooperado.dto';
import { UpdatePerfilFornecedorDto } from './dto/update-perfil-fornecedor.dto';
import { Usuario, UserRole } from '../usuarios/entities/usuario.entity';
import { PerfilAdministrador } from './entities/perfil-administrador.entity';
import { PerfilCooperado } from './entities/perfil-cooperado.entity';
import { PerfilFornecedor } from './entities/perfil-fornecedor.entity';
import { UpdateHomologacaoFornecedorDto } from './dto/update-homologacao-fornecedor.dto';
interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
    id: string;
    papel: UserRole;
}
export declare class PerfisController {
    private readonly perfisService;
    constructor(perfisService: PerfisService);
    createPerfilAdministrador(dto: CreatePerfilAdministradorDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilAdministrador>;
    createPerfilCooperado(dto: CreatePerfilCooperadoDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilCooperado>;
    createPerfilFornecedor(dto: CreatePerfilFornecedorDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilFornecedor>;
    getMeuPerfil(req: {
        user: AuthenticatedUser;
    }): Promise<any>;
    getPerfilFornecedor(usuarioId: string, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilFornecedor>;
    updatePerfilAdministrador(usuarioId: string, dto: UpdatePerfilAdministradorDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilAdministrador>;
    updatePerfilCooperado(usuarioId: string, dto: UpdatePerfilCooperadoDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilCooperado>;
    updatePerfilFornecedor(usuarioId: string, dto: UpdatePerfilFornecedorDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilFornecedor>;
    updateStatusHomologacao(fornecedorUsuarioId: string, dto: UpdateHomologacaoFornecedorDto, req: {
        user: AuthenticatedUser;
    }): Promise<PerfilFornecedor>;
}
export {};
