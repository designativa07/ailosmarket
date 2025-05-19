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
exports.CreateSolicitacaoDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSolicitacaoDto {
}
exports.CreateSolicitacaoDto = CreateSolicitacaoDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID do fornecedor deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID do fornecedor não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateSolicitacaoDto.prototype, "fornecedorId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID do serviço/produto deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateSolicitacaoDto.prototype, "servicoProdutoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSolicitacaoDto.prototype, "mensagemInicial", void 0);
//# sourceMappingURL=create-solicitacao.dto.js.map