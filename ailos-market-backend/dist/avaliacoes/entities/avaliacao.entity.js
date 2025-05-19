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
exports.Avaliacao = void 0;
const typeorm_1 = require("typeorm");
const solicitacao_servico_entity_1 = require("../../solicitacoes/entities/solicitacao-servico.entity");
const perfil_cooperado_entity_1 = require("../../perfis/entities/perfil-cooperado.entity");
const perfil_fornecedor_entity_1 = require("../../perfis/entities/perfil-fornecedor.entity");
const servico_produto_entity_1 = require("../../catalogo/entities/servico-produto.entity");
let Avaliacao = class Avaliacao {
};
exports.Avaliacao = Avaliacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Avaliacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'solicitacao_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Avaliacao.prototype, "solicitacaoId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => solicitacao_servico_entity_1.SolicitacaoServico, (solicitacao) => solicitacao.avaliacao, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'solicitacao_id' }),
    __metadata("design:type", solicitacao_servico_entity_1.SolicitacaoServico)
], Avaliacao.prototype, "solicitacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avaliador_id', type: 'uuid' }),
    __metadata("design:type", String)
], Avaliacao.prototype, "avaliadorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_cooperado_entity_1.PerfilCooperado, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'avaliador_id' }),
    __metadata("design:type", perfil_cooperado_entity_1.PerfilCooperado)
], Avaliacao.prototype, "avaliador", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avaliado_fornecedor_id', type: 'uuid' }),
    __metadata("design:type", String)
], Avaliacao.prototype, "avaliadoFornecedorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_fornecedor_entity_1.PerfilFornecedor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'avaliado_fornecedor_id' }),
    __metadata("design:type", perfil_fornecedor_entity_1.PerfilFornecedor)
], Avaliacao.prototype, "avaliadoFornecedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avaliado_servico_produto_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Avaliacao.prototype, "avaliadoServicoProdutoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servico_produto_entity_1.ServicoProduto, (servico) => servico.avaliacoesRecebidas, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'avaliado_servico_produto_id' }),
    __metadata("design:type", servico_produto_entity_1.ServicoProduto)
], Avaliacao.prototype, "avaliadoServicoProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Avaliacao.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Avaliacao.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_avaliacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Avaliacao.prototype, "dataAvaliacao", void 0);
exports.Avaliacao = Avaliacao = __decorate([
    (0, typeorm_1.Entity)({ name: 'avaliacoes' })
], Avaliacao);
//# sourceMappingURL=avaliacao.entity.js.map