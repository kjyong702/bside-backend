import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Diary, Prisma } from '@prisma/client';

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {}

  async diary(
    diaryWhereUniqueInput: Prisma.DiaryWhereUniqueInput,
  ): Promise<Diary | null> {
    return this.prisma.diary.findUnique({
      where: diaryWhereUniqueInput,
      include: { images: true },
    });
  }

  async diaries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiaryWhereUniqueInput;
    where?: Prisma.DiaryWhereInput;
    orderBy?: Prisma.DiaryOrderByWithRelationInput;
  }): Promise<Diary[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.diary.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDiary(data: Prisma.DiaryCreateInput) {
    return this.prisma.diary.create({
      data,
    });
  }

  async deleteDiary(where: Prisma.DiaryWhereUniqueInput) {
    return this.prisma.diary.delete({
      where,
    });
  }
}
