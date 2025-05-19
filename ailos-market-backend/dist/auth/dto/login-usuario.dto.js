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
exports.LoginUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
class LoginUsuarioDto {
}
exports.LoginUsuarioDto = LoginUsuarioDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O email fornecido é inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O email não pode estar vazio.' }),
    __metadata("design:type", String)
], LoginUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.MinLength)(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha não pode estar vazia.' }),
    __metadata("design:type", String)
], LoginUsuarioDto.prototype, "senha", void 0);
//# sourceMappingURL=login-usuario.dto.js.map