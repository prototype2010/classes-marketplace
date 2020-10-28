import { Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(signUpDTO: SignUpDTO) {
    return this.userService.createUser(signUpDTO);
  }
}
