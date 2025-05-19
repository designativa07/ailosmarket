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
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const usuario_entity_1 = require("../entities/usuario.entity");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O email fornecido é inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O email não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.MinLength)(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha não pode estar vazia.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(usuario_entity_1.UserRole, { message: 'O papel fornecido é inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O papel não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "papel", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome completo deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome completo não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nomeCompleto", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A URL da foto de perfil deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "fotoPerfilUrl", void 0);
//# sourceMappingURL=create-usuario.dto.js.map