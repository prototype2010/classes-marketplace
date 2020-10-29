import { IsEmail, IsString } from 'class-validator';
import { USER_ROLES } from '../../entity/user.entity';

import * as Joi from '@hapi/joi';
import { EXCEPTION_MESSAGES } from '../../common/exceptionMessages';

export class SignUpDTO {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsString()
  role: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export const SignUpSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .min(6)
    .max(20)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'any.only': EXCEPTION_MESSAGES.PASSWORDS_SHOULD_MATCH,
    }),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required(),

  role: Joi.string()
    .valid(USER_ROLES.BUSINESS, USER_ROLES.PARENT)
    .required(),

  firstName: Joi.string().required(),

  lastName: Joi.string().required(),
});
