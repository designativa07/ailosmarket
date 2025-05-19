"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaServicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categoria_servico_entity_1 = require("./entities/categoria-servico.entity");
let CategoriaServicoService = class CategoriaServicoService {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async create(dto) {
        const { nome } = dto;
        const existente = await this.categoriaRepository.findOne({ where: { nome } });
        if (existente) {
            throw new common_1.ConflictException(`Categoria com nome "${nome}" já existe.`);
        }
        const categoria = this.categoriaRepository.create({
            ...dto,
            ativo: dto.ativo !== undefined ? dto.ativo : true,
        });
        try {
            return await this.categoriaRepository.save(categoria);
        }
        catch (error) {
            console.error("Erro ao criar categoria: ", error);
            throw new common_1.InternalServerErrorException('Erro ao criar categoria de serviço/produto.');
        }
    }
    async findAll(apenasAtivas = true) {
        const whereClause = apenasAtivas ? { ativo: true } : {};
        return this.categoriaRepository.find({ where: whereClause, order: { nome: 'ASC' } });
    }
    async findOneById(id) {
        const categoria = await this.categoriaRepository.findOne({ where: { id } });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoria com ID ${id} não encontrada.`);
        }
        return categoria;
    }
    async update(id, dto) {
        const categoria = await this.findOneById(id);
        if (dto.nome && dto.nome !== categoria.nome) {
            const existenteComMesmoNome = await this.categoriaRepository.findOne({ where: { nome: dto.nome } });
            if (existenteComMesmoNome && existenteComMesmoNome.id !== id) {
                throw new common_1.ConflictException(`Outra categoria com nome "${dto.nome}" já existe.`);
            }
        }
        this.categoriaRepository.merge(categoria, dto);
        try {
            return await this.categoriaRepository.save(categoria);
        }
        catch (error) {
            console.error("Erro ao atualizar categoria: ", error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar categoria de serviço/produto.');
        }
    }
    async remove(id) {
        const categoria = await this.findOneById(id);
        categoria.ativo = false;
        try {
            await this.categoriaRepository.save(categoria);
        }
        catch (error) {
            console.error("Erro ao desativar categoria: ", error);
            throw new common_1.InternalServerErrorException('Erro ao desativar categoria de serviço/produto.');
        }
    }
};
exports.CategoriaServicoService = CategoriaServicoService;
exports.CategoriaServicoService = CategoriaServicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_servico_entity_1.CategoriaServico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriaServicoService);
//# sourceMappingURL=categoria-servico.service.js.map