import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { EqualProps } from '../../utils/validation/passwords.validator';

export class BaseUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  @EqualProps('password', { message: 'Passwords should match' })
  passwordConfirmation: string;
}
