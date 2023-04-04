import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DiaryModule } from './diary/diary.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UsersModule, DiaryModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
