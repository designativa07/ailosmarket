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
exports.IndicacaoCooperado = exports.IndicationStatus = void 0;
const typeorm_1 = require("typeorm");
const perfil_fornecedor_entity_1 = require("../../perfis/entities/perfil-fornecedor.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var IndicationStatus;
(function (IndicationStatus) {
    IndicationStatus["PENDENTE"] = "PENDENTE";
    IndicationStatus["EM_ANALISE"] = "EM_ANALISE";
    IndicationStatus["CONTATADO"] = "CONTATADO";
    IndicationStatus["CONVERTIDO"] = "CONVERTIDO";
    IndicationStatus["NAO_CONVERTIDO"] = "NAO_CONVERTIDO";
})(IndicationStatus || (exports.IndicationStatus = IndicationStatus = {}));
let IndicacaoCooperado = class IndicacaoCooperado {
};
exports.IndicacaoCooperado = IndicacaoCooperado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fornecedor_indicador_id', type: 'uuid' }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "fornecedorIndicadorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_fornecedor_entity_1.PerfilFornecedor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'fornecedor_indicador_id' }),
    __metadata("design:type", perfil_fornecedor_entity_1.PerfilFornecedor)
], IndicacaoCooperado.prototype, "fornecedorIndicador", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_empresa_indicada' }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "nomeEmpresaIndicada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cnpj_indicado', length: 18, nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "cnpjIndicado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_contato_indicado', nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "nomeContatoIndicado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefone_contato_indicado', length: 20, nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "telefoneContatoIndicado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_contato_indicado', nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "emailContatoIndicado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "observacao", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IndicationStatus,
        default: IndicationStatus.PENDENTE,
    }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_indicacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], IndicacaoCooperado.prototype, "dataIndicacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_ultima_atualizacao_status', type: 'timestamptz' }),
    __metadata("design:type", Date)
], IndicacaoCooperado.prototype, "dataUltimaAtualizacaoStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'administrador_responsavel_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], IndicacaoCooperado.prototype, "administradorResponsavelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'administrador_responsavel_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], IndicacaoCooperado.prototype, "administradorResponsavel", void 0);
exports.IndicacaoCooperado = IndicacaoCooperado = __decorate([
    (0, typeorm_1.Entity)({ name: 'indicacoes_cooperados' })
], IndicacaoCooperado);
//# sourceMappingURL=indicacao-cooperado.entity.js.map