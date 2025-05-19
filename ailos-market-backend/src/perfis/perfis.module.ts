import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilAdministrador } from './entities/perfil-administrador.entity';
import { PerfilCooperado } from './entities/perfil-cooperado.entity';
import { PerfilFornecedor } from './entities/perfil-fornecedor.entity';
import { PerfisService } from './perfis.service';
import { PerfisController } from './perfis.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PerfilAdministrador,
      PerfilCooperado,
      PerfilFornecedor,
    ]),
    UsuariosModule,
  ],
  providers: [PerfisService],
  controllers: [PerfisController],
  exports: [PerfisService],
})
export class PerfisModule {} 