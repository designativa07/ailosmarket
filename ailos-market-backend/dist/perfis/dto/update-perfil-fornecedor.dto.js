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
exports.UpdatePerfilFornecedorDto = void 0;
const class_validator_1 = require("class-validator");
class UpdatePerfilFornecedorDto {
}
exports.UpdatePerfilFornecedorDto = UpdatePerfilFornecedorDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome fantasia deve ser uma string.' }),
    __metadata("design:type", String)
], UpdatePerfilFornecedorDto.prototype, "nomeFantasia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O endereço completo deve ser uma string.' }),
    __metadata("design:type", String)
], UpdatePerfilFornecedorDto.prototype, "enderecoCompleto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição da empresa deve ser uma string.' }),
    __metadata("design:type", String)
], UpdatePerfilFornecedorDto.prototype, "descricaoEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Segmentos de atuação deve ser um array de strings.' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada segmento de atuação deve ser uma string.' }),
    __metadata("design:type", Array)
], UpdatePerfilFornecedorDto.prototype, "segmentosAtuacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'URLs de certificações deve ser um array de strings.' }),
    (0, class_validator_1.IsUrl)({}, { each: true, message: 'Cada certificação deve ser uma URL válida.' }),
    __metadata("design:type", Array)
], UpdatePerfilFornecedorDto.prototype, "certificacoesUrls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Referências comerciais devem ser uma string.' }),
    __metadata("design:type", String)
], UpdatePerfilFornecedorDto.prototype, "referenciasComerciais", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'URL do logo deve ser uma URL válida.' }),
    __metadata("design:type", String)
], UpdatePerfilFornecedorDto.prototype, "logoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePerfilFornecedorDto.prototype, "documentosEnviados", void 0);
//# sourceMappingURL=update-perfil-fornecedor.dto.js.map