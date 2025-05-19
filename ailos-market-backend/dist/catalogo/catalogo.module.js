"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categoria_servico_entity_1 = require("./entities/categoria-servico.entity");
const servico_produto_entity_1 = require("./entities/servico-produto.entity");
const catalogo_service_1 = require("./catalogo.service");
const catalogo_controller_1 = require("./catalogo.controller");
const perfis_module_1 = require("../perfis/perfis.module");
const auth_module_1 = require("../auth/auth.module");
const categoria_servico_service_1 = require("./categoria-servico.service");
const categoria_servico_controller_1 = require("./categoria-servico.controller");
let CatalogoModule = class CatalogoModule {
};
exports.CatalogoModule = CatalogoModule;
exports.CatalogoModule = CatalogoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                categoria_servico_entity_1.CategoriaServico,
                servico_produto_entity_1.ServicoProduto,
            ]),
            perfis_module_1.PerfisModule,
            auth_module_1.AuthModule,
        ],
        controllers: [catalogo_controller_1.CatalogoController, categoria_servico_controller_1.CategoriaServicoController],
        providers: [catalogo_service_1.CatalogoService, categoria_servico_service_1.CategoriaServicoService],
        exports: [catalogo_service_1.CatalogoService, categoria_servico_service_1.CategoriaServicoService],
    })
], CatalogoModule);
//# sourceMappingURL=catalogo.module.js.map