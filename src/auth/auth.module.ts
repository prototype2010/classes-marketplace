import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../users/user.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserService],
  exports: [AuthService],
})
export class AuthModule {}
