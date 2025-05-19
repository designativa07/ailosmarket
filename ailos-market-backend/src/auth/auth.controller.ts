import { Controller, Post, UseGuards, Request, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: Omit<Usuario, 'senhaHash'> }, @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) loginDto: LoginUsuarioDto) {
    // loginDto é usado aqui para garantir que o ValidationPipe seja acionado
    // e para clareza do payload esperado, embora as credenciais sejam efetivamente
    // extraídas e validadas pela LocalStrategy através do LocalAuthGuard.
    // O req.user é populado pela LocalStrategy após a validação bem-sucedida.
    return this.authService.login(req.user);
  }

  // Poderíamos adicionar um endpoint /profile aqui que usa JwtAuthGuard
  // para demonstrar a proteção de rotas, por exemplo:
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
} 