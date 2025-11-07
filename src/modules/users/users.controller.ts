import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }
}
