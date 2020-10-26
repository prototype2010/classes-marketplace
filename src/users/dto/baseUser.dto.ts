import { IsEmail, IsString } from 'class-validator';

export class BaseUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;
}
