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
exports.PerfisController = void 0;
const common_1 = require("@nestjs/common");
const perfis_service_1 = require("./perfis.service");
const create_perfil_administrador_dto_1 = require("./dto/create-perfil-administrador.dto");
const create_perfil_cooperado_dto_1 = require("./dto/create-perfil-cooperado.dto");
const create_perfil_fornecedor_dto_1 = require("./dto/create-perfil-fornecedor.dto");
const update_perfil_administrador_dto_1 = require("./dto/update-perfil-administrador.dto");
const update_perfil_cooperado_dto_1 = require("./dto/update-perfil-cooperado.dto");
const update_perfil_fornecedor_dto_1 = require("./dto/update-perfil-fornecedor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const update_homologacao_fornecedor_dto_1 = require("./dto/update-homologacao-fornecedor.dto");
let PerfisController = class PerfisController {
    constructor(perfisService) {
        this.perfisService = perfisService;
    }
    async createPerfilAdministrador(dto, req) {
        if (req.user.id !== dto.usuarioId || req.user.papel !== usuario_entity_1.UserRole.ADMINISTRADOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para criar este perfil de administrador ou o ID do usuário não corresponde.');
        }
        return this.perfisService.createPerfilAdministrador(dto);
    }
    async createPerfilCooperado(dto, req) {
        if (req.user.id !== dto.usuarioId || req.user.papel !== usuario_entity_1.UserRole.COOPERADO) {
            throw new common_1.ForbiddenException('Você não tem permissão para criar este perfil de cooperado ou o ID do usuário não corresponde.');
        }
        return this.perfisService.createPerfilCooperado(dto);
    }
    async createPerfilFornecedor(dto, req) {
        if (req.user.id !== dto.usuarioId || req.user.papel !== usuario_entity_1.UserRole.FORNECEDOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para criar este perfil de fornecedor ou o ID do usuário não corresponde.');
        }
        return this.perfisService.createPerfilFornecedor(dto);
    }
    async getMeuPerfil(req) {
        const { id, papel } = req.user;
        let perfil;
        switch (papel) {
            case usuario_entity_1.UserRole.ADMINISTRADOR:
                perfil = await this.perfisService.findPerfilAdministradorByUsuarioId(id);
                break;
            case usuario_entity_1.UserRole.COOPERADO:
                perfil = await this.perfisService.findPerfilCooperadoByUsuarioId(id);
                break;
            case usuario_entity_1.UserRole.FORNECEDOR:
                perfil = await this.perfisService.findPerfilFornecedorByUsuarioId(id);
                break;
            default:
                throw new common_1.NotFoundException('Tipo de perfil desconhecido.');
        }
        if (!perfil) {
            throw new common_1.NotFoundException('Perfil não encontrado para o usuário autenticado.');
        }
        return perfil;
    }
    async getPerfilFornecedor(usuarioId, req) {
        if (req.user.papel === usuario_entity_1.UserRole.FORNECEDOR && req.user.id !== usuarioId) {
            throw new common_1.ForbiddenException('Fornecedores só podem buscar o próprio perfil por este endpoint.');
        }
        if (req.user.papel !== usuario_entity_1.UserRole.FORNECEDOR && req.user.papel !== usuario_entity_1.UserRole.ADMINISTRADOR) {
            throw new common_1.ForbiddenException('Acesso não autorizado.');
        }
        const perfil = await this.perfisService.findPerfilFornecedorByUsuarioId(usuarioId);
        if (!perfil) {
            throw new common_1.NotFoundException(`Perfil de fornecedor não encontrado para o usuário ID: ${usuarioId}`);
        }
        return perfil;
    }
    async updatePerfilAdministrador(usuarioId, dto, req) {
        if (req.user.id !== usuarioId || req.user.papel !== usuario_entity_1.UserRole.ADMINISTRADOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para atualizar este perfil de administrador.');
        }
        return this.perfisService.updatePerfilAdministrador(usuarioId, dto);
    }
    async updatePerfilCooperado(usuarioId, dto, req) {
        if (req.user.id !== usuarioId || req.user.papel !== usuario_entity_1.UserRole.COOPERADO) {
            throw new common_1.ForbiddenException('Você não tem permissão para atualizar este perfil de cooperado.');
        }
        return this.perfisService.updatePerfilCooperado(usuarioId, dto);
    }
    async updatePerfilFornecedor(usuarioId, dto, req) {
        if (req.user.id !== usuarioId || req.user.papel !== usuario_entity_1.UserRole.FORNECEDOR) {
            throw new common_1.ForbiddenException('Você não tem permissão para atualizar este perfil de fornecedor.');
        }
        return this.perfisService.updatePerfilFornecedor(usuarioId, dto);
    }
    async updateStatusHomologacao(fornecedorUsuarioId, dto, req) {
        const adminHomologadorId = req.user.id;
        return this.perfisService.updateStatusHomologacaoFornecedor(fornecedorUsuarioId, adminHomologadorId, dto);
    }
};
exports.PerfisController = PerfisController;
__decorate([
    (0, common_1.Post)('administrador'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_perfil_administrador_dto_1.CreatePerfilAdministradorDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "createPerfilAdministrador", null);
__decorate([
    (0, common_1.Post)('cooperado'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_perfil_cooperado_dto_1.CreatePerfilCooperadoDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "createPerfilCooperado", null);
__decorate([
    (0, common_1.Post)('fornecedor'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_perfil_fornecedor_dto_1.CreatePerfilFornecedorDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "createPerfilFornecedor", null);
__decorate([
    (0, common_1.Get)('meu-perfil'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "getMeuPerfil", null);
__decorate([
    (0, common_1.Get)('fornecedor/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "getPerfilFornecedor", null);
__decorate([
    (0, common_1.Patch)('administrador/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_perfil_administrador_dto_1.UpdatePerfilAdministradorDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "updatePerfilAdministrador", null);
__decorate([
    (0, common_1.Patch)('cooperado/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_perfil_cooperado_dto_1.UpdatePerfilCooperadoDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "updatePerfilCooperado", null);
__decorate([
    (0, common_1.Patch)('fornecedor/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_perfil_fornecedor_dto_1.UpdatePerfilFornecedorDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "updatePerfilFornecedor", null);
__decorate([
    (0, common_1.Patch)('fornecedor/:fornecedorUsuarioId/homologacao'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.UserRole.ADMINISTRADOR),
    __param(0, (0, common_1.Param)('fornecedorUsuarioId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_homologacao_fornecedor_dto_1.UpdateHomologacaoFornecedorDto, Object]),
    __metadata("design:returntype", Promise)
], PerfisController.prototype, "updateStatusHomologacao", null);
exports.PerfisController = PerfisController = __decorate([
    (0, common_1.Controller)('perfis'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [perfis_service_1.PerfisService])
], PerfisController);
//# sourceMappingURL=perfis.controller.js.map