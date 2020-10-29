import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Connection, Repository } from 'typeorm';
import { SignUpDTO } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  private userRepository: UserRepository;
  // constructor(
  //   @InjectRepository(UserRepository)
  //   private readonly repo: Repository<User>,
  // ) {}
  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository<UserRepository>(
      UserRepository,
    );
  }

  async createUser(signUpDTO: SignUpDTO) {
    try {
      return this.userRepository.createUser(signUpDTO as any).catch(e => {
        var x = 1;
      });
    } catch (e) {
      console.error('################################');
      console.error(e);
    }
  }
}
