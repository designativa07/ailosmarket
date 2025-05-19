import { Repository } from 'typeorm';
import { ServicoProduto } from './entities/servico-produto.entity';
import { CreateServicoProdutoDto } from './dto/create-servico-produto.dto';
import { UpdateServicoProdutoDto } from './dto/update-servico-produto.dto';
import { PerfisService } from '../perfis/perfis.service';
import { UserRole } from '../usuarios/entities/usuario.entity';
import { CategoriaServicoService } from './categoria-servico.service';
export declare class CatalogoService {
    private readonly servicoProdutoRepository;
    private readonly perfisService;
    private readonly categoriaService;
    constructor(servicoProdutoRepository: Repository<ServicoProduto>, perfisService: PerfisService, categoriaService: CategoriaServicoService);
    create(dto: CreateServicoProdutoDto, solicitanteId: string, solicitantePapel: string): Promise<ServicoProduto>;
    findAll(fornecedorId?: string): Promise<ServicoProduto[]>;
    findOneByItemId(itemId: string): Promise<ServicoProduto | undefined>;
    update(itemId: string, dto: UpdateServicoProdutoDto, solicitanteId: string, solicitantePapel: UserRole): Promise<ServicoProduto>;
    remove(itemId: string, solicitanteId: string, solicitantePapel: UserRole): Promise<void>;
}
