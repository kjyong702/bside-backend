import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }

  // 기존에 구현한 코드
  // async createUser(
  //   kakaoId: string,
  //   name: string,
  //   email: string,
  //   ageRange: string,
  // ) {
  //   const createdUser = await this.prisma.user.create({
  //     data: {
  //       kakaoId,
  //       name,
  //       email,
  //       ageRange,
  //     },
  //   });

  //   return createdUser;
  // }

  // async findOne(kakaoId: string) {
  //   if (!kakaoId) {
  //     return null;
  //   }

  //   return await this.prisma.user.findUnique({
  //     where: { kakaoId },
  //   });
  // }

  // async remove(kakaoId: string) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { kakaoId },
  //   });
  //   if (!user) {
  //     throw new Error('user not found');
  //   }

  //   return await this.prisma.user.delete({
  //     where: { kakaoId },
  //   });
  // }
}
