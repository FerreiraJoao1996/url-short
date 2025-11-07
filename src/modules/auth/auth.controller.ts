import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth';
import type { Response } from 'express';
import { Duration } from '../../utils/duration';
import { LoginSwagger } from './swagger/login';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiOperation({ summary: 'Login de usuário' })
  @LoginSwagger()
  async login(@Body() body: AuthDTO, @Res() res: Response) {
    const auth = await this.authService.login(body.email, body.password);
    const { access_token } = auth;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Duration.Day
    });

    res.send({
      access_token
    });
  }
}
