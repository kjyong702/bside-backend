import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async kakaoLogin(code: string) {
    const token_api_uri = `https://kauth.kakao.com/oauth/token?client_id=${process.env.REST_API_KEY}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}&code=${code}`;
    let response = await axios.post(token_api_uri, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token } = response.data;

    const userInfo_api_uri = 'https://kapi.kakao.com/v2/user/me';
    response = await axios.get(userInfo_api_uri, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const { id, properties, kakao_account } = response.data;

    const { nickname } = properties;
    const { email, age_range } = kakao_account;
    let user = await this.usersService.findOne(String(id));
    if (!user) {
      user = await this.usersService.createUser(
        String(id),
        nickname,
        email,
        age_range,
      );
    }
    const accessToken = await this.jwtService.signAsync({
      username: user.name,
      kakaoId: user.kakaoId,
    });
    return { user, accessToken };
  }
}
