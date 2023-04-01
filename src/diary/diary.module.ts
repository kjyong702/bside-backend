import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService, UsersService, PrismaService],
})
export class DiaryModule {}
