import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDTO, SignUpSchema } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../common/pipes/JoiValidationPipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(new JoiValidationPipe(SignUpSchema)) parentDTO: SignUpDTO) {
    return this.authService.signUp(parentDTO);
  }
}
