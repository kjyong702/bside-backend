import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { UsersService } from '../users/users.service';
import { Diary as DiaryModel } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';

@Controller('diary')
export class DiaryController {
  constructor(
    private diaryService: DiaryService,
    private usersService: UsersService,
  ) {}

  // 최신순 정렬
  @Get()
  @UseGuards(AuthGuard)
  async getDiariesForUserOrderByAsc(@Request() req: any) {
    const kakaoId = req.user.kakaoId;
    const user = await this.usersService.user({ kakaoId });

    return this.diaryService.diaries({
      where: { authorId: user.id },
      orderBy: { createdAt: 'asc' },
    });
  }
  // 오래된순 정렬
  @Get('/filteredDesc')
  @UseGuards(AuthGuard)
  async getDiariesForUserOrderByDesc(@Request() req: any) {
    const kakaoId = req.user.kakaoId;
    const user = await this.usersService.user({ kakaoId });

    return this.diaryService.diaries({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createDiary(
    @Body()
    body: {
      alcholType: string;
      amount: number;
      amountType: string;
      withWhom: string;
      where: string;
      why?: string;
      food?: string;
      thought?: string;
    },
    @Request() req: any,
  ): Promise<DiaryModel> {
    const {
      alcholType,
      amount,
      amountType,
      withWhom,
      where,
      why,
      food,
      thought,
    } = body;
    return this.diaryService.createDiary({
      alcholType,
      amount,
      amountType,
      withWhom,
      where,
      why,
      food,
      thought,
      author: {
        connect: {
          kakaoId: req.user.kakaoId,
        },
      },
    });
  }

  @Get('/:id')
  async getDiaryById(@Param('id') id: string) {
    return this.diaryService.diary({ id: Number(id) });
  }

  @Delete('/:id')
  async deleteDiaryById(@Param('id') id: string) {
    return this.diaryService.deleteDiary({ id: Number(id) });
  }
}
