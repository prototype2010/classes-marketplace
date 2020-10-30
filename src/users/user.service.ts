import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';
import { SignUpDTO } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  private userRepository: UserRepository;
  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository<UserRepository>(
      UserRepository,
    );
  }

  async createUser(signUpDTO: SignUpDTO) {
    return this.userRepository.createUser(signUpDTO as any);
  }

  validateUser(email: string, password: string) {
    return this.userRepository.validateUser(email, password);
  }
}
