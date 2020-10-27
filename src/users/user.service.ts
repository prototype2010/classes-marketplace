import { Injectable } from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async createParent(parentDTO: ParentDTO) {
    return this.usersRepository.createParent(parentDTO);
  }

  async createBusiness(businessDTO: BusinessDTO) {}
}
