import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { JoiValidationPipe } from '../common/pipes/JoiValidationPipe';
import { AuthorizedRequest } from '../utils/types/authorized.request.interface';

import { LocalAuthGuard } from './local-auth.guard';
import { SignUpDTO, SignUpSchema } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  async signin(@Req() req: AuthorizedRequest) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  signup(@Body(new JoiValidationPipe(SignUpSchema)) signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  /* eslint-disable-next-line */
  async googleAuth(@Req() req: Request) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req);
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  /* eslint-disable-next-line */
  async facebookAuth(@Req() req: Request) {}

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/redirect')
  async facebookAuthRedirect(@Req() req: Request) {
    return this.authService.facebookLogin(req);
  }
}
