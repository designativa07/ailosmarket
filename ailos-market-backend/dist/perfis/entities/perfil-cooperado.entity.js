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
exports.PerfilCooperado = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let PerfilCooperado = class PerfilCooperado {
};
exports.PerfilCooperado = PerfilCooperado;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], PerfilCooperado.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, { primary: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], PerfilCooperado.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf_cnpj', length: 18, unique: true, nullable: true }),
    __metadata("design:type", String)
], PerfilCooperado.prototype, "cpfCnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'razao_social', nullable: true }),
    __metadata("design:type", String)
], PerfilCooperado.prototype, "razaoSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_fantasia', nullable: true }),
    __metadata("design:type", String)
], PerfilCooperado.prototype, "nomeFantasia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_associacao', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], PerfilCooperado.prototype, "dataAssociacao", void 0);
exports.PerfilCooperado = PerfilCooperado = __decorate([
    (0, typeorm_1.Entity)({ name: 'perfis_cooperados' })
], PerfilCooperado);
//# sourceMappingURL=perfil-cooperado.entity.js.map