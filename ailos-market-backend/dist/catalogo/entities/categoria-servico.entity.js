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
exports.CategoriaServico = void 0;
const typeorm_1 = require("typeorm");
const servico_produto_entity_1 = require("./servico-produto.entity");
let CategoriaServico = class CategoriaServico {
};
exports.CategoriaServico = CategoriaServico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoriaServico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], CategoriaServico.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CategoriaServico.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CategoriaServico.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_criacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CategoriaServico.prototype, "dataCriacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_atualizacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CategoriaServico.prototype, "dataAtualizacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => servico_produto_entity_1.ServicoProduto, (servicoProduto) => servicoProduto.categoria),
    __metadata("design:type", Array)
], CategoriaServico.prototype, "servicosProdutos", void 0);
exports.CategoriaServico = CategoriaServico = __decorate([
    (0, typeorm_1.Entity)({ name: 'categorias_servicos' })
], CategoriaServico);
//# sourceMappingURL=categoria-servico.entity.js.map