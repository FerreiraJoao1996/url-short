import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user';
import type { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserSwagger } from './swagger/create-user';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Post('/')
  @ApiOperation({ summary: 'Criação de usuários' })
  @CreateUserSwagger()
  async create(@Body() body: UserDTO, @Res() res: Response) {
    res.send(await this.userService.create(body));
  }
}
