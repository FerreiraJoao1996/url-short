import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UpdateUserDTO, UserDTO } from './dto/user';
import { Hash } from '../../utils/hash';

@Injectable()
export class UsersService {

  async create(body: UserDTO) {
    try {
      const hasUser = await UsersEntity.findOne({
        where: { email: body.email },
      });

      if (hasUser) {
        throw new ConflictException(
          `Já existe um usuário com o e-mail: ${body.email}`
        );
      }

      if (body.password !== body.confirmPassword) {
        throw new ConflictException('As senhas informadas não coincidem!');
      }

      const passwordHash = await Hash.make(body.password);
      body.password = passwordHash;

      return await UsersEntity.create({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: passwordHash,
      });

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string) {
    try {
      if (!email) throw new NotFoundException('Email inválido ou não existe!');

      const user = await UsersEntity.findOne({
        where: { email: email },
        raw: true
      });

      if (!user) throw new NotFoundException('Usuário não encontrado!');

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

}
