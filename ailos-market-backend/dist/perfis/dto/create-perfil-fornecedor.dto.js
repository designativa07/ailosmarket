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
exports.CreatePerfilFornecedorDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePerfilFornecedorDto {
}
exports.CreatePerfilFornecedorDto = CreatePerfilFornecedorDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'O ID do usuário deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID do usuário não pode estar vazio.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'CNPJ deve ser uma string.' }),
    (0, class_validator_1.Length)(14, 14, { message: 'CNPJ deve ter 14 caracteres.' }),
    (0, class_validator_1.Matches)(/^\d{14}$/, { message: 'CNPJ inválido. Forneça apenas os números.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CNPJ não pode estar vazio.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A razão social deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A razão social não pode estar vazia.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "razaoSocial", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome fantasia deve ser uma string.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "nomeFantasia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O endereço completo deve ser uma string.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "enderecoCompleto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição da empresa deve ser uma string.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "descricaoEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Segmentos de atuação deve ser um array de strings.' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada segmento de atuação deve ser uma string.' }),
    __metadata("design:type", Array)
], CreatePerfilFornecedorDto.prototype, "segmentosAtuacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'URLs de certificações deve ser um array de strings.' }),
    (0, class_validator_1.IsUrl)({}, { each: true, message: 'Cada certificação deve ser uma URL válida.' }),
    __metadata("design:type", Array)
], CreatePerfilFornecedorDto.prototype, "certificacoesUrls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Referências comerciais devem ser uma string.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "referenciasComerciais", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'URL do logo deve ser uma URL válida.' }),
    __metadata("design:type", String)
], CreatePerfilFornecedorDto.prototype, "logoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePerfilFornecedorDto.prototype, "documentosEnviados", void 0);
//# sourceMappingURL=create-perfil-fornecedor.dto.js.map