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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoController = void 0;
const common_1 = require("@nestjs/common");
const catalogo_service_1 = require("./catalogo.service");
const create_servico_produto_dto_1 = require("./dto/create-servico-produto.dto");
const update_servico_produto_dto_1 = require("./dto/update-servico-produto.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let CatalogoController = class CatalogoController {
    constructor(catalogoService) {
        this.catalogoService = catalogoService;
    }
    async create(dto, req) {
        return this.catalogoService.create(dto, req.user.id, req.user.papel);
    }
    async findAll(fornecedorId) {
        return this.catalogoService.findAll(fornecedorId);
    }
    async findOne(itemId) {
        return this.catalogoService.findOneByItemId(itemId);
    }
    async update(itemId, dto, req) {
        return this.catalogoService.update(itemId, dto, req.user.id, req.user.papel);
    }
    async remove(itemId, req) {
        await this.catalogoService.remove(itemId, req.user.id, req.user.papel);
    }
};
exports.CatalogoController = CatalogoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.UserRole.FORNECEDOR),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servico_produto_dto_1.CreateServicoProdutoDto, Object]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('fornecedorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':itemId'),
    __param(0, (0, common_1.Param)('itemId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':itemId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('itemId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_servico_produto_dto_1.UpdateServicoProdutoDto, Object]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':itemId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('itemId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "remove", null);
exports.CatalogoController = CatalogoController = __decorate([
    (0, common_1.Controller)('catalogo'),
    __metadata("design:paramtypes", [catalogo_service_1.CatalogoService])
], CatalogoController);
//# sourceMappingURL=catalogo.controller.js.map