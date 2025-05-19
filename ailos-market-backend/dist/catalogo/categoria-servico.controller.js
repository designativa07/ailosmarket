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
exports.CategoriaServicoController = void 0;
const common_1 = require("@nestjs/common");
const categoria_servico_service_1 = require("./categoria-servico.service");
const create_categoria_servico_dto_1 = require("./dto/create-categoria-servico.dto");
const update_categoria_servico_dto_1 = require("./dto/update-categoria-servico.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let CategoriaServicoController = class CategoriaServicoController {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
    }
    create(dto) {
        return this.categoriaService.create(dto);
    }
    findAll(incluirInativas) {
        const apenasAtivas = incluirInativas !== 'true';
        return this.categoriaService.findAll(apenasAtivas);
    }
    findOne(id) {
        return this.categoriaService.findOneById(id);
    }
    update(id, dto) {
        return this.categoriaService.update(id, dto);
    }
    remove(id) {
        return this.categoriaService.remove(id);
    }
};
exports.CategoriaServicoController = CategoriaServicoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.UserRole.ADMINISTRADOR),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categoria_servico_dto_1.CreateCategoriaServicoDto]),
    __metadata("design:returntype", Promise)
], CategoriaServicoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('incluirInativas')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriaServicoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriaServicoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.UserRole.ADMINISTRADOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_categoria_servico_dto_1.UpdateCategoriaServicoDto]),
    __metadata("design:returntype", Promise)
], CategoriaServicoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.UserRole.ADMINISTRADOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriaServicoController.prototype, "remove", null);
exports.CategoriaServicoController = CategoriaServicoController = __decorate([
    (0, common_1.Controller)('catalogo/categorias'),
    __metadata("design:paramtypes", [categoria_servico_service_1.CategoriaServicoService])
], CategoriaServicoController);
//# sourceMappingURL=categoria-servico.controller.js.map