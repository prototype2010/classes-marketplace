import { IsEmail, IsString } from 'class-validator';
import { PUBLIC_USER_ROLES } from '../../entity/user.entity';

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
  role: PUBLIC_USER_ROLES;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
