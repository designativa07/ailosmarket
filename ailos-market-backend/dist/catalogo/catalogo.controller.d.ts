import { CatalogoService } from './catalogo.service';
import { CreateServicoProdutoDto } from './dto/create-servico-produto.dto';
import { UpdateServicoProdutoDto } from './dto/update-servico-produto.dto';
import { ServicoProduto } from './entities/servico-produto.entity';
import { UserRole, Usuario } from '../usuarios/entities/usuario.entity';
interface AuthenticatedUser extends Omit<Usuario, 'senhaHash'> {
    id: string;
    papel: UserRole;
}
export declare class CatalogoController {
    private readonly catalogoService;
    constructor(catalogoService: CatalogoService);
    create(dto: CreateServicoProdutoDto, req: {
        user: AuthenticatedUser;
    }): Promise<ServicoProduto>;
    findAll(fornecedorId?: string): Promise<ServicoProduto[]>;
    findOne(itemId: string): Promise<ServicoProduto | undefined>;
    update(itemId: string, dto: UpdateServicoProdutoDto, req: {
        user: AuthenticatedUser;
    }): Promise<ServicoProduto>;
    remove(itemId: string, req: {
        user: AuthenticatedUser;
    }): Promise<void>;
}
export {};
