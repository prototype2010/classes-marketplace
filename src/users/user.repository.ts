import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { User, USER_ROLES } from '../entity/user.entity';
import { SignUpDTO } from '../auth/dto/signup.dto';
import { GoogleUser } from '../auth/google.strategy';
import { hashString } from '../utils/hash';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({
    email,
    password,
    phone,
    lastName,
    role,
    firstName,
  }: SignUpDTO) {
    await this.checkNotExist(email);

    const userRole = <USER_ROLES>role;
    const emailConfirmationHash = await hashString(email);
    const userPassword = await hashString(password);

    const user = User.merge(new User(), {
      email,
      password: userPassword,
      phone,
      lastName,
      role: userRole,
      firstName,
      emailConfirmationHash,
    });

    return user.save();
  }

  private async findUser(...params: Array<Partial<User>>) {
    const user = await this.findOne(...params);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async checkNotExist(email: string) {
    const existingUser = await this.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email already used');
    }
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.findUser({ email });
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      /* eslint-disable-next-line */
      const { password, ...restParams } = user;

      return restParams;
    } else {
      throw new UnauthorizedException();
    }
  }

  async findOrCreateGoogleUser(googleUser: Partial<GoogleUser>) {
    const { email, googleId } = googleUser;

    const user: User = await this.findOne({ where: [{ email }, { googleId }] });

    if (user) {
      return user;
    } else {
      return this.createGoogleUser(googleUser);
    }
  }

  private async createGoogleUser({
    lastName,
    firstName,
    email,
    googleId,
  }: Partial<GoogleUser>) {
    const user = User.merge(new User(), {
      lastName,
      firstName,
      email,
      googleId,
      isEmailConfirmed: true,
      role: USER_ROLES.PARENT,
    });

    return user.save();
  }
}
