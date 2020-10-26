import { Injectable } from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';

@Injectable()
export class UsersService {
  async createParent(parentDto: ParentDTO) {}

  async createBusiness(businessDTO: BusinessDTO) {}
}
