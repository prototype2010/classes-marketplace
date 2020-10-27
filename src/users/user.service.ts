import { Injectable } from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
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

  async createParent(parentDTO: ParentDTO) {
    return this.userRepository.createParent(parentDTO);
  }

  async createBusiness(businessDTO: BusinessDTO) {
    return this.userRepository.createBusiness(businessDTO);
  }
}
