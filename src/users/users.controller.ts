import { Body, Controller, Post } from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('parent')
  createParent(@Body() parentDTO: ParentDTO) {
    return this.usersService.createParent(parentDTO);
  }

  @Post('business')
  createBusiness(@Body() businessDTO: BusinessDTO) {
    return this.usersService.createBusiness(businessDTO);
  }
}
