import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfisModule } from './perfis/perfis.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { IndicacoesModule } from './indicacoes/indicacoes.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente disponíveis globalmente
      envFilePath: '.env', // Especifica o caminho do arquivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'ailos_market'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Auto-create schema (dev only)
        logging: process.env.NODE_ENV !== 'production', // Log das queries SQL em desenvolvimento
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Adicionado para flexibilidade com SSL
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'YOUR_DEFAULT_SECRET'), // It's crucial to set this in .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN', '3600s') },
      }),
      inject: [ConfigService],
      global: true, // Make JwtModule global
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'ailos-market-frontend', 'build'),
      exclude: ['/api/(.*)'], // Exclude API routes from being served as static files
    }),
    UsuariosModule,
    PerfisModule,
    CatalogoModule,
    SolicitacoesModule,
    AvaliacoesModule,
    IndicacoesModule,
    AuthModule,
    // Outros módulos da aplicação virão aqui (AuthModule, UsersModule, etc.)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 