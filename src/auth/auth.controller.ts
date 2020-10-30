import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDTO, SignUpSchema } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../common/pipes/JoiValidationPipe';
import { SignInDTO, SignInSchema } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './dto/local-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return 'success';
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Body(new JoiValidationPipe(SignInSchema)) signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    return this.authService.validateUser(email, password);
  }

  @Post('signup')
  signup(@Body(new JoiValidationPipe(SignUpSchema)) parentDTO: SignUpDTO) {
    return this.authService.signUp(parentDTO);
  }
}
