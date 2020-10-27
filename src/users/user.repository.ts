import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { ConflictException } from '@nestjs/common';
import { USER_TYPES } from './user.types.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createParent({ email, password, phone }: ParentDTO) {
    await this.checkNotExist(email);

    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.phone = phone;
    user.type = USER_TYPES.PARENT;

    return user.save();
  }

  async createBusiness({
    email,
    password,
    phone,
    contactEmail,
    localBusinessId,
    name,
    owner,
    website,
  }: BusinessDTO) {
    await this.checkNotExist(email);

    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.phone = phone;
    user.contactEmail = contactEmail;
    user.localBusinessId = localBusinessId;
    user.name = name;
    user.owner = owner;
    user.website = website;
    user.type = USER_TYPES.BUSINESS;

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
