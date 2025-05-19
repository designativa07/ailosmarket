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
exports.MensagemSolicitacao = void 0;
const typeorm_1 = require("typeorm");
const solicitacao_servico_entity_1 = require("./solicitacao-servico.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let MensagemSolicitacao = class MensagemSolicitacao {
};
exports.MensagemSolicitacao = MensagemSolicitacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MensagemSolicitacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'solicitacao_id', type: 'uuid' }),
    __metadata("design:type", String)
], MensagemSolicitacao.prototype, "solicitacaoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => solicitacao_servico_entity_1.SolicitacaoServico, (solicitacao) => solicitacao.mensagens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'solicitacao_id' }),
    __metadata("design:type", solicitacao_servico_entity_1.SolicitacaoServico)
], MensagemSolicitacao.prototype, "solicitacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remetente_id', type: 'uuid' }),
    __metadata("design:type", String)
], MensagemSolicitacao.prototype, "remetenteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'remetente_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], MensagemSolicitacao.prototype, "remetente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MensagemSolicitacao.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MensagemSolicitacao.prototype, "lida", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_envio', type: 'timestamptz' }),
    __metadata("design:type", Date)
], MensagemSolicitacao.prototype, "dataEnvio", void 0);
exports.MensagemSolicitacao = MensagemSolicitacao = __decorate([
    (0, typeorm_1.Entity)({ name: 'mensagens_solicitacoes' })
], MensagemSolicitacao);
//# sourceMappingURL=mensagem-solicitacao.entity.js.map