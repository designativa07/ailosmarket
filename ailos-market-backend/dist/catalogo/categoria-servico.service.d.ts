import { Repository } from 'typeorm';
import { CategoriaServico } from './entities/categoria-servico.entity';
import { CreateCategoriaServicoDto } from './dto/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dto/update-categoria-servico.dto';
export declare class CategoriaServicoService {
    private readonly categoriaRepository;
    constructor(categoriaRepository: Repository<CategoriaServico>);
    create(dto: CreateCategoriaServicoDto): Promise<CategoriaServico>;
    findAll(apenasAtivas?: boolean): Promise<CategoriaServico[]>;
    findOneById(id: number): Promise<CategoriaServico | undefined>;
    update(id: number, dto: UpdateCategoriaServicoDto): Promise<CategoriaServico>;
    remove(id: number): Promise<void>;
}
