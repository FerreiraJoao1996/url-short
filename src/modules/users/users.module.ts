import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProvider } from './entities/users.provider';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...UsersProvider],
  exports: [UsersService, ...UsersProvider],
})
export class UsersModule {}
