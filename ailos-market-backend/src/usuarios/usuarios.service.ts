import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findOneByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<Omit<Usuario, 'senhaHash'> | undefined> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      return undefined;
    }
    const { senhaHash, ...result } = user;
    return result;
  }

  async findOneByIdWithPassword(id: string): Promise<Usuario | undefined> {
    // Este método pode ser usado internamente se a senhaHash for necessária em algum momento
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { email, senha, nomeCompleto, papel, telefone, fotoPerfilUrl } = createUsuarioDto;

    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Este email já está em uso.');
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
      ativo: true, // Definindo usuário como ativo por padrão
    });

    try {
      return await this.usuarioRepository.save(novoUsuario);
    } catch (error) {
      // Log error (implement proper logging)
      console.error(error);
      throw new InternalServerErrorException('Erro ao criar o usuário. Por favor, tente novamente mais tarde.');
    }
  }

  async findAll(): Promise<Omit<Usuario, 'senhaHash'>[]> {
    const users = await this.usuarioRepository.find();
    // Remover senhaHash antes de retornar
    return users.map(({ senhaHash, ...user }) => user);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<Usuario, 'senhaHash'> | undefined> {
    // Verifica se o usuário existe
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuarioExistente) {
      return undefined; // Ou lançar NotFoundException se preferir que o controller trate
    }

    // Mescla os dados do DTO no usuário existente
    // Apenas os campos definidos no DTO serão atualizados
    // TypeORM fará a mesclagem e salvará apenas os campos alterados
    this.usuarioRepository.merge(usuarioExistente, updateUsuarioDto);
    
    const updatedUser = await this.usuarioRepository.save(usuarioExistente);
    
    const { senhaHash, ...result } = updatedUser;
    return result;
  }

  async remove(id: string): Promise<Omit<Usuario, 'senhaHash'> | undefined> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      return undefined; // Ou lançar NotFoundException
    }
    if (!usuario.ativo) {
      // Poderia retornar um erro específico ou o usuário já inativo
      // Por ora, apenas retorna o usuário como está, o controller pode decidir.
      const { senhaHash, ...result } = usuario;
      return result; // Retorna o usuário já inativo
    }

    usuario.ativo = false;
    const deactivatedUser = await this.usuarioRepository.save(usuario);
    const { senhaHash, ...result } = deactivatedUser;
    return result;
  }

  // Outros métodos CRUD e lógicas de negócio para usuários virão aqui
  // Por exemplo, para criar um usuário com senha hasheada:
  // async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, salt);
  //   const novoUsuario = this.usuarioRepository.create({
  //     ...createUsuarioDto,
  //     senhaHash: hashedPassword,
  //   });
  //   return this.usuarioRepository.save(novoUsuario);
  // }
} 