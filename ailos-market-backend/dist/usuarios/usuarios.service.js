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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const bcrypt = require("bcrypt");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async findOneByEmail(email) {
        return this.usuarioRepository.findOne({ where: { email } });
    }
    async findOneById(id) {
        const user = await this.usuarioRepository.findOne({ where: { id } });
        if (!user) {
            return undefined;
        }
        const { senhaHash, ...result } = user;
        return result;
    }
    async findOneByIdWithPassword(id) {
        return this.usuarioRepository.findOne({ where: { id } });
    }
    async create(createUsuarioDto) {
        const { email, senha, nomeCompleto, papel, telefone, fotoPerfilUrl } = createUsuarioDto;
        const existingUser = await this.findOneByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('Este email já está em uso.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(senha, salt);
        const novoUsuario = this.usuarioRepository.create({
            email,
            senhaHash: hashedPassword,
            nomeCompleto,
            papel,
            telefone,
            fotoPerfilUrl,
            ativo: true,
        });
        try {
            return await this.usuarioRepository.save(novoUsuario);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao criar o usuário. Por favor, tente novamente mais tarde.');
        }
    }
    async findAll() {
        const users = await this.usuarioRepository.find();
        return users.map(({ senhaHash, ...user }) => user);
    }
    async update(id, updateUsuarioDto) {
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioExistente) {
            return undefined;
        }
        this.usuarioRepository.merge(usuarioExistente, updateUsuarioDto);
        const updatedUser = await this.usuarioRepository.save(usuarioExistente);
        const { senhaHash, ...result } = updatedUser;
        return result;
    }
    async remove(id) {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) {
            return undefined;
        }
        if (!usuario.ativo) {
            const { senhaHash, ...result } = usuario;
            return result;
        }
        usuario.ativo = false;
        const deactivatedUser = await this.usuarioRepository.save(usuario);
        const { senhaHash, ...result } = deactivatedUser;
        return result;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map