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
exports.Usuario = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const perfil_administrador_entity_1 = require("../../perfis/entities/perfil-administrador.entity");
const perfil_cooperado_entity_1 = require("../../perfis/entities/perfil-cooperado.entity");
const perfil_fornecedor_entity_1 = require("../../perfis/entities/perfil-fornecedor.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMINISTRADOR"] = "ADMINISTRADOR";
    UserRole["COOPERADO"] = "COOPERADO";
    UserRole["FORNECEDOR"] = "FORNECEDOR";
})(UserRole || (exports.UserRole = UserRole = {}));
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'senha_hash' }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], Usuario.prototype, "senhaHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "papel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_completo', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nomeCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'foto_perfil_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "fotoPerfilUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_criacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Usuario.prototype, "dataCriacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'data_atualizacao', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Usuario.prototype, "dataAtualizacao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => perfil_administrador_entity_1.PerfilAdministrador, (perfil) => perfil.usuario, { cascade: true, eager: false }),
    __metadata("design:type", perfil_administrador_entity_1.PerfilAdministrador)
], Usuario.prototype, "perfilAdministrador", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => perfil_cooperado_entity_1.PerfilCooperado, (perfil) => perfil.usuario, { cascade: true, eager: false }),
    __metadata("design:type", perfil_cooperado_entity_1.PerfilCooperado)
], Usuario.prototype, "perfilCooperado", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => perfil_fornecedor_entity_1.PerfilFornecedor, (perfil) => perfil.usuario, { cascade: true, eager: false }),
    __metadata("design:type", perfil_fornecedor_entity_1.PerfilFornecedor)
], Usuario.prototype, "perfilFornecedor", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map