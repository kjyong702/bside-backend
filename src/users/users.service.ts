import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    kakaoId: string,
    name: string,
    email: string,
    ageRange: string,
  ) {
    const createdUser = await this.prisma.user.create({
      data: {
        kakaoId,
        name,
        email,
        ageRange,
      },
    });

    return createdUser;
  }

  async findOne(kakaoId: string) {
    if (!kakaoId) {
      return null;
    }

    return await this.prisma.user.findUnique({
      where: { kakaoId },
    });
  }

  async remove(kakaoId: string) {
    const user = await this.prisma.user.findUnique({
      where: { kakaoId },
    });
    if (!user) {
      throw new Error('user not found');
    }

    return await this.prisma.user.delete({
      where: { kakaoId },
    });
  }
}
