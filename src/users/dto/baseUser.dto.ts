import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { EqualProps } from '../../utils/validation/passwords.validator';

export class BaseUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(8)
  @EqualProps('password', { message: 'Passwords should match' })
  passwordConfirmation: string;

  @IsString()
  @MaxLength(50)
  name: string;
}
