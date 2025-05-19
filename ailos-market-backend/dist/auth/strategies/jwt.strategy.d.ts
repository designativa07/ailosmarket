import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Usuario } from '../../usuarios/entities/usuario.entity';
interface JwtPayload {
    sub: string;
    email: string;
    papel: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usuariosService;
    constructor(configService: ConfigService, usuariosService: UsuariosService);
    validate(payload: JwtPayload): Promise<Omit<Usuario, 'senhaHash'> | null>;
}
export {};
