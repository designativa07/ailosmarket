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
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Caminho para as entidades (vamos criar depois)
        synchronize: process.env.NODE_ENV !== 'production', // true em desenvolvimento para criar/atualizar tabelas automaticamente (cuidado em produção)
        logging: process.env.NODE_ENV !== 'production', // Log das queries SQL em desenvolvimento
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Adicionado para flexibilidade com SSL
      }),
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