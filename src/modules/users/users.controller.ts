import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Post('/')
  async create(@Body() body: UserDTO, @Res() res: Response) {
    res.send(await this.userService.create(body));
  }
}
