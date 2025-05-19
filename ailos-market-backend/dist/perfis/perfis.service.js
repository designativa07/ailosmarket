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
exports.PerfisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const perfil_administrador_entity_1 = require("./entities/perfil-administrador.entity");
const perfil_cooperado_entity_1 = require("./entities/perfil-cooperado.entity");
const perfil_fornecedor_entity_1 = require("./entities/perfil-fornecedor.entity");
const perfil_fornecedor_entity_2 = require("./entities/perfil-fornecedor.entity");
let PerfisService = class PerfisService {
    constructor(perfilAdminRepository, perfilCooperadoRepository, perfilFornecedorRepository, usuariosService) {
        this.perfilAdminRepository = perfilAdminRepository;
        this.perfilCooperadoRepository = perfilCooperadoRepository;
        this.perfilFornecedorRepository = perfilFornecedorRepository;
        this.usuariosService = usuariosService;
    }
    async verificarUsuarioEConflitoDePerfil(usuarioId, papelEsperado) {
        const usuario = await this.usuariosService.findOneByIdWithPassword(usuarioId);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        if (usuario.papel !== papelEsperado) {
            throw new common_1.BadRequestException(`O usuário não tem o papel de ${papelEsperado} para criar este perfil.`);
        }
        const perfilAdmin = await this.perfilAdminRepository.findOne({ where: { usuarioId } });
        const perfilCooperado = await this.perfilCooperadoRepository.findOne({ where: { usuarioId } });
        const perfilFornecedor = await this.perfilFornecedorRepository.findOne({ where: { usuarioId } });
        let perfilCount = 0;
        if (perfilAdmin)
            perfilCount++;
        if (perfilCooperado)
            perfilCount++;
        if (perfilFornecedor)
            perfilCount++;
        if (perfilCount > 1) {
            console.error(`Usuário ${usuarioId} tem múltiplos perfis associados.`);
            throw new common_1.InternalServerErrorException('Conflito de dados de perfil para o usuário.');
        }
        if (perfilCount === 1 && ((papelEsperado === usuario_entity_1.UserRole.ADMINISTRADOR && !perfilAdmin) ||
            (papelEsperado === usuario_entity_1.UserRole.COOPERADO && !perfilCooperado) ||
            (papelEsperado === usuario_entity_1.UserRole.FORNECEDOR && !perfilFornecedor))) {
            throw new common_1.ConflictException('Este usuário já possui um tipo diferente de perfil associado.');
        }
        return usuario;
    }
    async createPerfilAdministrador(dto) {
        await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, usuario_entity_1.UserRole.ADMINISTRADOR);
        const perfilExistente = await this.perfilAdminRepository.findOne({ where: { usuarioId: dto.usuarioId } });
        if (perfilExistente) {
            throw new common_1.ConflictException('Perfil de Administrador já existe para este usuário.');
        }
        try {
            const novoPerfil = this.perfilAdminRepository.create(dto);
            return await this.perfilAdminRepository.save(novoPerfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao criar o perfil de administrador.');
        }
    }
    async createPerfilCooperado(dto) {
        await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, usuario_entity_1.UserRole.COOPERADO);
        const perfilExistente = await this.perfilCooperadoRepository.findOne({ where: { usuarioId: dto.usuarioId } });
        if (perfilExistente) {
            throw new common_1.ConflictException('Perfil de Cooperado já existe para este usuário.');
        }
        if (dto.cpfCnpj) {
            const comMesmoDoc = await this.perfilCooperadoRepository.findOne({ where: { cpfCnpj: dto.cpfCnpj } });
            if (comMesmoDoc && comMesmoDoc.usuarioId !== dto.usuarioId) {
                throw new common_1.ConflictException('CPF/CNPJ já cadastrado para outro cooperado.');
            }
        }
        try {
            const novoPerfil = this.perfilCooperadoRepository.create(dto);
            return await this.perfilCooperadoRepository.save(novoPerfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao criar o perfil de cooperado.');
        }
    }
    async createPerfilFornecedor(dto) {
        await this.verificarUsuarioEConflitoDePerfil(dto.usuarioId, usuario_entity_1.UserRole.FORNECEDOR);
        const perfilExistente = await this.perfilFornecedorRepository.findOne({ where: { usuarioId: dto.usuarioId } });
        if (perfilExistente) {
            throw new common_1.ConflictException('Perfil de Fornecedor já existe para este usuário.');
        }
        const comMesmoCnpj = await this.perfilFornecedorRepository.findOne({ where: { cnpj: dto.cnpj } });
        if (comMesmoCnpj && comMesmoCnpj.usuarioId !== dto.usuarioId) {
            throw new common_1.ConflictException('CNPJ já cadastrado para outro fornecedor.');
        }
        try {
            const novoPerfil = this.perfilFornecedorRepository.create(dto);
            return await this.perfilFornecedorRepository.save(novoPerfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao criar o perfil de fornecedor.');
        }
    }
    async findPerfilAdministradorByUsuarioId(usuarioId) {
        return this.perfilAdminRepository.findOne({ where: { usuarioId } });
    }
    async findPerfilCooperadoByUsuarioId(usuarioId) {
        return this.perfilCooperadoRepository.findOne({ where: { usuarioId } });
    }
    async findPerfilFornecedorByUsuarioId(usuarioId) {
        return this.perfilFornecedorRepository.findOne({ where: { usuarioId }, relations: ['usuario'] });
    }
    async updatePerfilAdministrador(usuarioId, dto) {
        const perfil = await this.perfilAdminRepository.findOne({ where: { usuarioId } });
        if (!perfil) {
            throw new common_1.NotFoundException('Perfil de Administrador não encontrado.');
        }
        this.perfilAdminRepository.merge(perfil, dto);
        try {
            return await this.perfilAdminRepository.save(perfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar o perfil de administrador.');
        }
    }
    async updatePerfilCooperado(usuarioId, dto) {
        const perfil = await this.perfilCooperadoRepository.findOne({ where: { usuarioId } });
        if (!perfil) {
            throw new common_1.NotFoundException('Perfil de Cooperado não encontrado.');
        }
        if (dto.cpfCnpj && dto.cpfCnpj !== perfil.cpfCnpj) {
            const comMesmoDoc = await this.perfilCooperadoRepository.findOne({ where: { cpfCnpj: dto.cpfCnpj } });
            if (comMesmoDoc && comMesmoDoc.usuarioId !== usuarioId) {
                throw new common_1.ConflictException('CPF/CNPJ já cadastrado para outro cooperado.');
            }
        }
        this.perfilCooperadoRepository.merge(perfil, dto);
        try {
            return await this.perfilCooperadoRepository.save(perfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar o perfil de cooperado.');
        }
    }
    async updatePerfilFornecedor(usuarioId, dto) {
        const perfil = await this.perfilFornecedorRepository.findOne({ where: { usuarioId } });
        if (!perfil) {
            throw new common_1.NotFoundException('Perfil de Fornecedor não encontrado.');
        }
        this.perfilFornecedorRepository.merge(perfil, dto);
        try {
            return await this.perfilFornecedorRepository.save(perfil);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar o perfil de fornecedor.');
        }
    }
    async updateStatusHomologacaoFornecedor(fornecedorUsuarioId, adminHomologadorId, dto) {
        const perfilFornecedor = await this.perfilFornecedorRepository.findOne({ where: { usuarioId: fornecedorUsuarioId } });
        if (!perfilFornecedor) {
            throw new common_1.NotFoundException(`Perfil de Fornecedor com usuário ID ${fornecedorUsuarioId} não encontrado.`);
        }
        perfilFornecedor.statusHomologacao = dto.statusHomologacao;
        perfilFornecedor.justificativaRejeicao = dto.statusHomologacao === perfil_fornecedor_entity_2.HomologationStatus.REJEITADO ? dto.justificativaRejeicao : null;
        perfilFornecedor.administradorHomologadorId = adminHomologadorId;
        perfilFornecedor.dataHomologacao = (dto.statusHomologacao === perfil_fornecedor_entity_2.HomologationStatus.APROVADO || dto.statusHomologacao === perfil_fornecedor_entity_2.HomologationStatus.REJEITADO) ? new Date() : null;
        perfilFornecedor.dataUltimaVerificacaoAdmin = new Date();
        try {
            return await this.perfilFornecedorRepository.save(perfilFornecedor);
        }
        catch (error) {
            console.error('Erro ao atualizar status de homologação:', error);
            throw new common_1.InternalServerErrorException('Erro ao atualizar status de homologação do fornecedor.');
        }
    }
};
exports.PerfisService = PerfisService;
exports.PerfisService = PerfisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(perfil_administrador_entity_1.PerfilAdministrador)),
    __param(1, (0, typeorm_1.InjectRepository)(perfil_cooperado_entity_1.PerfilCooperado)),
    __param(2, (0, typeorm_1.InjectRepository)(perfil_fornecedor_entity_1.PerfilFornecedor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        usuarios_service_1.UsuariosService])
], PerfisService);
//# sourceMappingURL=perfis.service.js.map