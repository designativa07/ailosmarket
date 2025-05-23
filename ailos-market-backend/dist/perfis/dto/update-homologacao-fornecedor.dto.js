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
exports.UpdateHomologacaoFornecedorDto = void 0;
const class_validator_1 = require("class-validator");
const perfil_fornecedor_entity_1 = require("../entities/perfil-fornecedor.entity");
class UpdateHomologacaoFornecedorDto {
}
exports.UpdateHomologacaoFornecedorDto = UpdateHomologacaoFornecedorDto;
__decorate([
    (0, class_validator_1.IsEnum)(perfil_fornecedor_entity_1.HomologationStatus, { message: 'Status de homologação inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O status de homologação não pode estar vazio.' }),
    __metadata("design:type", String)
], UpdateHomologacaoFornecedorDto.prototype, "statusHomologacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomologacaoFornecedorDto.prototype, "justificativaRejeicao", void 0);
//# sourceMappingURL=update-homologacao-fornecedor.dto.js.map