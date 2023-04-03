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
  @Get('/filter/asc')
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
  @Get('/filter/desc')
  @UseGuards(AuthGuard)
  async getDiariesForUserOrderByDesc(@Request() req: any) {
    const kakaoId = req.user.kakaoId;
    const user = await this.usersService.user({ kakaoId });

    return this.diaryService.diaries({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 일기 생성
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
      amount: Number(amount),
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

  // 일기 상세 정보
  @Get('/:id')
  async getDiaryById(@Param('id') id: string) {
    return this.diaryService.diary({ id: Number(id) });
  }

  // 일기 삭제
  @Delete('/:id')
  async deleteDiaryById(@Param('id') id: string) {
    return this.diaryService.deleteDiary({ id: Number(id) });
  }
}
