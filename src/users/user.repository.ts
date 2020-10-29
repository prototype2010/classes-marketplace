import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User, USER_ROLES } from '../entity/user.entity';
import { ConflictException } from '@nestjs/common';
import { SignUpDTO } from '../auth/dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({
    email,
    password,
    phone,
    firstName,
    lastName,
    role,
  }: SignUpDTO) {
    await this.checkNotExist(email);

    const user = new User();
    user.email = email;
    user.phone = phone;
    user.password = await this.hashPassword(password);
    user.role = USER_ROLES.PARENT;

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
