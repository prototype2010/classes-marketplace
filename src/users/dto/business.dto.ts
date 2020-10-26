import { BaseUserDTO } from './baseUser.dto';
import { IsString, MaxLength } from 'class-validator';

export class BusinessDTO extends BaseUserDTO {
  @IsString()
  @MaxLength(50)
  localBusinessId: string;

  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  owner: string;

  @IsString()
  @MaxLength(50)
  website: string;
}
