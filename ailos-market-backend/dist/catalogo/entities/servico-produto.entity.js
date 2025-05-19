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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoProduto = void 0;
const typeorm_1 = require("typeorm");
const perfil_fornecedor_entity_1 = require("../../perfis/entities/perfil-fornecedor.entity");
const categoria_servico_entity_1 = require("./categoria-servico.entity");
const solicitacao_servico_entity_1 = require("../../solicitacoes/entities/solicitacao-servico.entity");
const avaliacao_entity_1 = require("../../avaliacoes/entities/avaliacao.entity");
let ServicoProduto = class ServicoProduto {
};
exports.ServicoProduto = ServicoProduto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServicoProduto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fornecedor_id', type: 'uuid' }),
    __metadata("design:type", String)
], ServicoProduto.prototype, "fornecedorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_fornecedor_entity_1.PerfilFornecedor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'fornecedor_id' }),
    __metadata("design:type", perfil_fornecedor_entity_1.PerfilFornecedor)
], ServicoProduto.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ServicoProduto.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_servico_entity_1.CategoriaServico, (categoria) => categoria.servicosProdutos, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_servico_entity_1.CategoriaServico)
], ServicoProduto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServicoProduto.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descricao_detalhada', type: 'text' }),
    __metadata("design:type", String)
], ServicoProduto.prototype, "descricaoDetalhada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'palavras_chave', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], ServicoProduto.prototype, "palavrasChave", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preco_base', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ServicoProduto.prototype, "precoBase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unidade_medida', length: 50, nullable: true }),
    __metadata("design:type", String)
], ServicoProduto.prototype, "unidadeMedida", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ServicoProduto.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_criacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ServicoProduto.prototype, "dataCriacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_atualizacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ServicoProduto.prototype, "dataAtualizacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => solicitacao_servico_entity_1.SolicitacaoServico, (solicitacao) => solicitacao.servicoProduto),
    __metadata("design:type", Array)
], ServicoProduto.prototype, "solicitacoesServicos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => avaliacao_entity_1.Avaliacao, (avaliacao) => avaliacao.avaliadoServicoProduto),
    __metadata("design:type", Array)
], ServicoProduto.prototype, "avaliacoesRecebidas", void 0);
exports.ServicoProduto = ServicoProduto = __decorate([
    (0, typeorm_1.Entity)({ name: 'servicos_produtos' })
], ServicoProduto);
//# sourceMappingURL=servico-produto.entity.js.map