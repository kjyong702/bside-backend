import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/kakao/callback')
  async kakaoLogin(@Query('code') code: string) {
    return this.authService.kakaoLogin(code);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
