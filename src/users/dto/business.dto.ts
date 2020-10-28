import { BaseUserDTO } from './baseUser.dto';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class BusinessDTO extends BaseUserDTO {
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  localBusinessId: string;

  @IsString()
  @MaxLength(50)
  name: string;

  // @IsEmail()
  // @Optional()
  // contactEmail: string;
  //
  // @IsString()
  // @MaxLength(50)
  // owner: string;
  //
  // @IsString()
  // @MaxLength(50)
  // website: string;
}
