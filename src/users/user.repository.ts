import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ParentDTO } from '../auth/dto/parent.dto';
import { ConflictException } from '@nestjs/common';
import { USER_ROLES } from './user.types.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ email, password, phone }: ParentDTO) {
    await this.checkNotExist(email);

    const user = new User();
    user.email = email;
    user.phone = phone;
    user.password = await this.hashPassword(password);
    user.type = USER_ROLES.PARENT;

    return user.save();
  }

  private async checkNotExist(email: string) {
    const existingUser = await this.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email already used');
    }
  }

  private async hashPassword(password: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
  }
}
