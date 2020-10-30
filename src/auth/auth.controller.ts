import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { SignUpDTO, SignUpSchema } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../common/pipes/JoiValidationPipe';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

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
  async signin(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signup(@Body(new JoiValidationPipe(SignUpSchema)) parentDTO: SignUpDTO) {
    return this.authService.signUp(parentDTO);
  }
}
