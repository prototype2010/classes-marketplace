import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { BaseUserDTO } from './dto/baseUser.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createParent(userDTO: ParentDTO) {}

  async createBusiness(businessDTO: BusinessDTO) {}

  async createUser<T extends BaseUserDTO>(dto: T) {}
}
