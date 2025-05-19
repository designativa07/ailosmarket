import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service'; // Importa o serviço
import { UsuariosController } from './usuarios.controller'; // Importa o controller
// import { UsuariosController } from './usuarios.controller'; // Descomentar quando o controller for criado

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Registra a entidade Usuario com TypeORM
  controllers: [UsuariosController], // Adiciona o controller
  // controllers: [UsuariosController], // Descomentar quando o controller for criado
  providers: [UsuariosService], // Adiciona o serviço aos providers
  exports: [UsuariosService], // Exporta o serviço para ser usado por outros módulos (ex: AuthModule)
})
export class UsuariosModule {} 