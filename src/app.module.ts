import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [UsersModule, DiaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
