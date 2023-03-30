import { Controller, Get, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/kakao/callback')
  async kakaoLogin(@Query('code') code: any) {
    return this.authService.kakaoLogin(code);
  }

  @Get('/test')
  testFuncion(@Request() req) {
    return req.user;
  }
}