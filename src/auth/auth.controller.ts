import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpDTO, SignUpSchema } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../common/pipes/JoiValidationPipe';

@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(new JoiValidationPipe(SignUpSchema)) parentDTO: SignUpDTO) {
    return this.authService.signUp(parentDTO);
  }
}
