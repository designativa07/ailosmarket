import { CategoriaServicoService } from './categoria-servico.service';
import { CreateCategoriaServicoDto } from './dto/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dto/update-categoria-servico.dto';
import { CategoriaServico } from './entities/categoria-servico.entity';
export declare class CategoriaServicoController {
    private readonly categoriaService;
    constructor(categoriaService: CategoriaServicoService);
    create(dto: CreateCategoriaServicoDto): Promise<CategoriaServico>;
    findAll(incluirInativas?: string): Promise<CategoriaServico[]>;
    findOne(id: number): Promise<CategoriaServico | undefined>;
    update(id: number, dto: UpdateCategoriaServicoDto): Promise<CategoriaServico>;
    remove(id: number): Promise<void>;
}
