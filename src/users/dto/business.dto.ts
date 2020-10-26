import { BaseUserDTO } from './baseUser.dto';

export class BusinessDTO extends BaseUserDTO {
  localBusinessId: string;
  name: string;
  owner: string;
  website: string;
}
