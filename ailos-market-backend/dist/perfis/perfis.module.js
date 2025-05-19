"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const perfil_administrador_entity_1 = require("./entities/perfil-administrador.entity");
const perfil_cooperado_entity_1 = require("./entities/perfil-cooperado.entity");
const perfil_fornecedor_entity_1 = require("./entities/perfil-fornecedor.entity");
const perfis_service_1 = require("./perfis.service");
const perfis_controller_1 = require("./perfis.controller");
const usuarios_module_1 = require("../usuarios/usuarios.module");
let PerfisModule = class PerfisModule {
};
exports.PerfisModule = PerfisModule;
exports.PerfisModule = PerfisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                perfil_administrador_entity_1.PerfilAdministrador,
                perfil_cooperado_entity_1.PerfilCooperado,
                perfil_fornecedor_entity_1.PerfilFornecedor,
            ]),
            usuarios_module_1.UsuariosModule,
        ],
        providers: [perfis_service_1.PerfisService],
        controllers: [perfis_controller_1.PerfisController],
        exports: [perfis_service_1.PerfisService],
    })
], PerfisModule);
//# sourceMappingURL=perfis.module.js.map