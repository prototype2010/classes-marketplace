import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { User } from '../entity/user.entity';

import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  signUp(signUpDTO: SignUpDTO) {
    return this.userService.createUser(signUpDTO);
  }

  signIn({ id, role }: Partial<User>) {
    const payload = { id, role };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException('No user from google');
    }

    const user = await this.userService.findOrCreateGoogleUser(req.user);

    return this.signIn(user);
  }
  async facebookLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException('No user from facebook');
    }

    if (!req.user.email) {
      throw new UnprocessableEntityException(
        'You have to verify your email on facebook first',
      );
    }

    const user = await this.userService.findOrCreateFacebookUser(req.user);

    return this.signIn(user);
  }
}
