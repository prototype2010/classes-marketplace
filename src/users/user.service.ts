import { Injectable } from '@nestjs/common';
import { ParentDTO } from '../auth/dto/parent.dto';
import { BusinessDTO } from '../auth/dto/business.dto';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  private userRepository: UserRepository;
  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository<UserRepository>(
      UserRepository,
    );
  }

  async createUser(parentDTO: ParentDTO) {
    return this.userRepository.createUser(parentDTO);
  }
}
