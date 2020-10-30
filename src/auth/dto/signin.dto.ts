import { IsEmail, IsString } from 'class-validator';
import * as Joi from '@hapi/joi';

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export const SignInSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});
