import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParentDTO } from './dto/parent.dto';
import { BusinessDTO } from './dto/business.dto';
import { UserService } from './user.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('parent')
  createParent(@Body() parentDTO: ParentDTO) {
    return this.userService.createParent(parentDTO);
  }

  @Post('business')
  @UsePipes(new ValidationPipe())
  createBusiness(@Body() businessDTO: BusinessDTO) {
    return this.userService.createBusiness(businessDTO);
  }
}
