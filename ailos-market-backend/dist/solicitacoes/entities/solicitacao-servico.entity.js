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
exports.SolicitacaoServico = exports.RequestStatus = void 0;
const typeorm_1 = require("typeorm");
const perfil_cooperado_entity_1 = require("../../perfis/entities/perfil-cooperado.entity");
const perfil_fornecedor_entity_1 = require("../../perfis/entities/perfil-fornecedor.entity");
const servico_produto_entity_1 = require("../../catalogo/entities/servico-produto.entity");
const mensagem_solicitacao_entity_1 = require("./mensagem-solicitacao.entity");
const avaliacao_entity_1 = require("../../avaliacoes/entities/avaliacao.entity");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["NOVA"] = "NOVA";
    RequestStatus["EM_ANALISE_FORNECEDOR"] = "EM_ANALISE_FORNECEDOR";
    RequestStatus["PROPOSTA_ENVIADA"] = "PROPOSTA_ENVIADA";
    RequestStatus["ACEITA_COOPERADO"] = "ACEITA_COOPERADO";
    RequestStatus["RECUSADA_COOPERADO"] = "RECUSADA_COOPERADO";
    RequestStatus["EM_ANDAMENTO"] = "EM_ANDAMENTO";
    RequestStatus["CONCLUIDO"] = "CONCLUIDO";
    RequestStatus["CANCELADO"] = "CANCELADO";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
let SolicitacaoServico = class SolicitacaoServico {
};
exports.SolicitacaoServico = SolicitacaoServico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cooperado_id', type: 'uuid' }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "cooperadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_cooperado_entity_1.PerfilCooperado, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cooperado_id' }),
    __metadata("design:type", perfil_cooperado_entity_1.PerfilCooperado)
], SolicitacaoServico.prototype, "cooperado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fornecedor_id', type: 'uuid' }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "fornecedorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_fornecedor_entity_1.PerfilFornecedor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'fornecedor_id' }),
    __metadata("design:type", perfil_fornecedor_entity_1.PerfilFornecedor)
], SolicitacaoServico.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'servico_produto_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "servicoProdutoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servico_produto_entity_1.ServicoProduto, (servico) => servico.solicitacoesServicos, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'servico_produto_id' }),
    __metadata("design:type", servico_produto_entity_1.ServicoProduto)
], SolicitacaoServico.prototype, "servicoProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mensagem_inicial', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "mensagemInicial", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RequestStatus,
        default: RequestStatus.NOVA,
    }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_solicitacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SolicitacaoServico.prototype, "dataSolicitacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_ultima_atualizacao_status', type: 'timestamptz' }),
    __metadata("design:type", Date)
], SolicitacaoServico.prototype, "dataUltimaAtualizacaoStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_conclusao', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SolicitacaoServico.prototype, "dataConclusao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'historico_status', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], SolicitacaoServico.prototype, "historicoStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proposta_valor', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], SolicitacaoServico.prototype, "propostaValor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proposta_detalhes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolicitacaoServico.prototype, "propostaDetalhes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_envio_proposta', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SolicitacaoServico.prototype, "dataEnvioProposta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_resposta_proposta', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SolicitacaoServico.prototype, "dataRespostaProposta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mensagem_solicitacao_entity_1.MensagemSolicitacao, (mensagem) => mensagem.solicitacao),
    __metadata("design:type", Array)
], SolicitacaoServico.prototype, "mensagens", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => avaliacao_entity_1.Avaliacao, (avaliacao) => avaliacao.solicitacao),
    __metadata("design:type", avaliacao_entity_1.Avaliacao)
], SolicitacaoServico.prototype, "avaliacao", void 0);
exports.SolicitacaoServico = SolicitacaoServico = __decorate([
    (0, typeorm_1.Entity)({ name: 'solicitacoes_servicos' })
], SolicitacaoServico);
//# sourceMappingURL=solicitacao-servico.entity.js.map