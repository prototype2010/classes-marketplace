import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createParent(userDTO: ParentDTO) {
    const { email, password, phone } = userDTO;

    const existingUser = await this.find({ email });

    if (existingUser) {
      throw new ConflictException('Email already used');
    } else {
      const user = new User();
      user.email = email;
      user.password = await this.hashPassword(password);
      user.phone = phone;

      await user.save();
    }
  }

  async createBusiness(businessDTO: BusinessDTO) {}

  private async hashPassword(password: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
  }
}
