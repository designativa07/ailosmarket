"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const perfis_module_1 = require("./perfis/perfis.module");
const catalogo_module_1 = require("./catalogo/catalogo.module");
const solicitacoes_module_1 = require("./solicitacoes/solicitacoes.module");
const avaliacoes_module_1 = require("./avaliacoes/avaliacoes.module");
const indicacoes_module_1 = require("./indicacoes/indicacoes.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_DATABASE', 'ailos_market'),
                    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                    synchronize: configService.get('NODE_ENV') !== 'production',
                    logging: process.env.NODE_ENV !== 'production',
                    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
                }),
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET', 'YOUR_DEFAULT_SECRET'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '3600s') },
                }),
                inject: [config_1.ConfigService],
                global: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'ailos-market-frontend', 'build'),
                exclude: ['/api/(.*)'],
            }),
            usuarios_module_1.UsuariosModule,
            perfis_module_1.PerfisModule,
            catalogo_module_1.CatalogoModule,
            solicitacoes_module_1.SolicitacoesModule,
            avaliacoes_module_1.AvaliacoesModule,
            indicacoes_module_1.IndicacoesModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map