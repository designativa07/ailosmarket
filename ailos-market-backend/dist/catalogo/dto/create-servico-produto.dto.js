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
exports.CreateServicoProdutoDto = void 0;
const class_validator_1 = require("class-validator");
class CreateServicoProdutoDto {
}
exports.CreateServicoProdutoDto = CreateServicoProdutoDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID do fornecedor deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID do fornecedor não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateServicoProdutoDto.prototype, "fornecedorId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome não pode estar vazio.' }),
    __metadata("design:type", String)
], CreateServicoProdutoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Descrição detalhada deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Descrição detalhada não pode estar vazia.' }),
    __metadata("design:type", String)
], CreateServicoProdutoDto.prototype, "descricaoDetalhada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Palavras-chave devem ser um array de strings.' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada palavra-chave deve ser uma string.' }),
    __metadata("design:type", Array)
], CreateServicoProdutoDto.prototype, "palavrasChave", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Preço base deve ser um número com até 2 casas decimais.' }),
    (0, class_validator_1.Min)(0, { message: 'Preço base não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreateServicoProdutoDto.prototype, "precoBase", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Unidade de medida deve ser uma string.' }),
    __metadata("design:type", String)
], CreateServicoProdutoDto.prototype, "unidadeMedida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo ativo deve ser um booleano.' }),
    __metadata("design:type", Boolean)
], CreateServicoProdutoDto.prototype, "ativo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'ID da categoria deve ser um número inteiro.' }),
    __metadata("design:type", Number)
], CreateServicoProdutoDto.prototype, "categoriaId", void 0);
//# sourceMappingURL=create-servico-produto.dto.js.map