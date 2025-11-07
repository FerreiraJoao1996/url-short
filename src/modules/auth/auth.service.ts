import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { Hash } from '../../utils/hash';
import { AccessToken } from './dto/access-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
  ) { }

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    const validPassword = await Hash.check(pass, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('A senha informada não é valida!');
    }

    const payload: AccessToken = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
