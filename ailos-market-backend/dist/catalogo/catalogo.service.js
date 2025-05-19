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
exports.CatalogoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const servico_produto_entity_1 = require("./entities/servico-produto.entity");
const perfis_service_1 = require("../perfis/perfis.service");
const perfil_fornecedor_entity_1 = require("../perfis/entities/perfil-fornecedor.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const categoria_servico_service_1 = require("./categoria-servico.service");
let CatalogoService = class CatalogoService {
    constructor(servicoProdutoRepository, perfisService, categoriaService) {
        this.servicoProdutoRepository = servicoProdutoRepository;
        this.perfisService = perfisService;
        this.categoriaService = categoriaService;
    }
    async create(dto, solicitanteId, solicitantePapel) {
        const perfilFornecedor = await this.perfisService.findPerfilFornecedorByUsuarioId(dto.fornecedorId);
        if (!perfilFornecedor) {
            throw new common_1.NotFoundException(`Perfil de fornecedor com ID de usuário ${dto.fornecedorId} não encontrado.`);
        }
        if (solicitanteId !== perfilFornecedor.usuarioId) {
            throw new common_1.ForbiddenException('Você só pode adicionar itens de catálogo ao seu próprio perfil de fornecedor.');
        }
        if (perfilFornecedor.statusHomologacao !== perfil_fornecedor_entity_1.HomologationStatus.APROVADO) {
            throw new common_1.ForbiddenException('Seu perfil de fornecedor não está aprovado para adicionar itens ao catálogo.');
        }
        let categoria = null;
        if (dto.categoriaId) {
            const categoriaEncontrada = await this.categoriaService.findOneById(dto.categoriaId);
            if (!categoriaEncontrada || !categoriaEncontrada.ativo) {
                throw new common_1.BadRequestException(`Categoria com ID ${dto.categoriaId} não encontrada ou inativa.`);
            }
            categoria = categoriaEncontrada;
        }
        const novoItem = this.servicoProdutoRepository.create({
            ...dto,
            categoria: categoria,
            ativo: dto.ativo !== undefined ? dto.ativo : true,
        });
        try {
            return await this.servicoProdutoRepository.save(novoItem);
        }
        catch (error) {
            console.error("Erro ao salvar item no catálogo: ", error);
            throw new common_1.InternalServerErrorException('Erro ao adicionar item ao catálogo.');
        }
    }
    async findAll(fornecedorId) {
        if (fornecedorId) {
            return this.servicoProdutoRepository.find({
                where: { fornecedorId, ativo: true },
                relations: ['categoria'],
            });
        }
        return this.servicoProdutoRepository.find({ where: { ativo: true }, relations: ['categoria', 'fornecedor'] });
    }
    async findOneByItemId(itemId) {
        const item = await this.servicoProdutoRepository.findOne({
            where: { id: itemId, ativo: true },
            relations: ['fornecedor', 'categoria']
        });
        if (!item) {
            throw new common_1.NotFoundException(`Item do catálogo com ID ${itemId} não encontrado ou inativo.`);
        }
        return item;
    }
    async update(itemId, dto, solicitanteId, solicitantePapel) {
        const item = await this.servicoProdutoRepository.findOne({ where: { id: itemId }, relations: ['fornecedor', 'categoria'] });
        if (!item) {
            throw new common_1.NotFoundException(`Item do catálogo com ID ${itemId} não encontrado.`);
        }
        if (item.fornecedor.usuarioId !== solicitanteId && solicitantePapel !== usuario_entity_1.UserRole.ADMINISTRADOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para atualizar este item do catálogo.');
        }
        if (dto.categoriaId === null) {
            item.categoria = null;
            item.categoriaId = null;
        }
        else if (dto.categoriaId !== undefined) {
            const categoriaEncontrada = await this.categoriaService.findOneById(dto.categoriaId);
            if (!categoriaEncontrada || !categoriaEncontrada.ativo) {
                throw new common_1.BadRequestException(`Categoria com ID ${dto.categoriaId} não encontrada ou inativa.`);
            }
            item.categoria = categoriaEncontrada;
            item.categoriaId = categoriaEncontrada.id;
        }
        const { categoriaId, ...updateData } = dto;
        this.servicoProdutoRepository.merge(item, updateData);
        try {
            return await this.servicoProdutoRepository.save(item);
        }
        catch (error) {
            console.error("Erro ao atualizar item no catálogo: ", error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar item do catálogo.');
        }
    }
    async remove(itemId, solicitanteId, solicitantePapel) {
        const item = await this.servicoProdutoRepository.findOne({ where: { id: itemId }, relations: ['fornecedor'] });
        if (!item) {
            throw new common_1.NotFoundException(`Item do catálogo com ID ${itemId} não encontrado.`);
        }
        if (item.fornecedor.usuarioId !== solicitanteId && solicitantePapel !== usuario_entity_1.UserRole.ADMINISTRADOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para remover este item do catálogo.');
        }
        item.ativo = false;
        try {
            await this.servicoProdutoRepository.save(item);
        }
        catch (error) {
            console.error("Erro ao remover item no catálogo: ", error);
            throw new common_1.InternalServerErrorException('Erro ao remover item do catálogo.');
        }
    }
};
exports.CatalogoService = CatalogoService;
exports.CatalogoService = CatalogoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servico_produto_entity_1.ServicoProduto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        perfis_service_1.PerfisService,
        categoria_servico_service_1.CategoriaServicoService])
], CatalogoService);
//# sourceMappingURL=catalogo.service.js.map