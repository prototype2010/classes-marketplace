import { Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { UserService } from '../users/user.service';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  signUp(signUpDTO: SignUpDTO) {
    return this.userService.createUser(signUpDTO);
  }

  login({ id, role }: Partial<User>) {
    const payload = { id, role };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }
}
