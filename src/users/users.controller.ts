import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('parent')
  createParent(@Body() parentDTO: ParentDTO) {
    return this.userService.createParent(parentDTO);
  }

  @Post('business')
  createBusiness(@Body() businessDTO: BusinessDTO) {
    return this.userService.createBusiness(businessDTO);
  }
}
