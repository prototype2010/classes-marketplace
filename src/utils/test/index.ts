import * as faker from 'faker';

import { SignUpDTO } from '../../auth/dto/signup.dto';
import { User, USER_ROLES } from '../../entity/user.entity';
import { hashString } from '../hash';

const { internet, random } = faker;

export const createUserByParams = async (
  userParams: Partial<Omit<SignUpDTO, 'passwordConfirmation'>> = {},
) => {
  const fakeParams = {
    email: internet.email(),
    firstName: random.alphaNumeric(10),
    lastName: random.alphaNumeric(10),
    password: random.alphaNumeric(10),
    role: USER_ROLES.PARENT,
    phone: random.alphaNumeric(10),
  };

  const createParams = { ...fakeParams, ...userParams };

  const emailConfirmationHash = await hashString(createParams.email);
  const passwordHash = await hashString(createParams.password);

  const dbUser = User.merge(new User(), {
    ...createParams,
    password: passwordHash,
    emailConfirmationHash,
    role: <USER_ROLES>createParams.role,
  });

  await dbUser.save();

  return { userParams: createParams, dbUser };
};
