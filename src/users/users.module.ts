import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
