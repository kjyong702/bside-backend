import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DiaryModule } from './diary/diary.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    DiaryModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
