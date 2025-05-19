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
exports.PerfilFornecedor = exports.HomologationStatus = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var HomologationStatus;
(function (HomologationStatus) {
    HomologationStatus["PENDENTE"] = "PENDENTE";
    HomologationStatus["EM_ANALISE"] = "EM_ANALISE";
    HomologationStatus["APROVADO"] = "APROVADO";
    HomologationStatus["REJEITADO"] = "REJEITADO";
})(HomologationStatus || (exports.HomologationStatus = HomologationStatus = {}));
let PerfilFornecedor = class PerfilFornecedor {
};
exports.PerfilFornecedor = PerfilFornecedor;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, { primary: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], PerfilFornecedor.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 18, unique: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'razao_social' }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "razaoSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_fantasia', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "nomeFantasia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'endereco_completo', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "enderecoCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descricao_empresa', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "descricaoEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'segmentos_atuacao', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], PerfilFornecedor.prototype, "segmentosAtuacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificacoes_urls', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], PerfilFornecedor.prototype, "certificacoesUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencias_comerciais', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "referenciasComerciais", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_homologacao',
        type: 'enum',
        enum: HomologationStatus,
        default: HomologationStatus.PENDENTE,
    }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "statusHomologacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'justificativa_rejeicao', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "justificativaRejeicao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_solicitacao_homologacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PerfilFornecedor.prototype, "dataSolicitacaoHomologacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_homologacao', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], PerfilFornecedor.prototype, "dataHomologacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'administrador_homologador_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "administradorHomologadorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilFornecedor.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'documentos_enviados', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], PerfilFornecedor.prototype, "documentosEnviados", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_ultima_verificacao_admin', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], PerfilFornecedor.prototype, "dataUltimaVerificacaoAdmin", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_atualizacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PerfilFornecedor.prototype, "dataAtualizacao", void 0);
exports.PerfilFornecedor = PerfilFornecedor = __decorate([
    (0, typeorm_1.Entity)({ name: 'perfis_fornecedores' })
], PerfilFornecedor);
//# sourceMappingURL=perfil-fornecedor.entity.js.map