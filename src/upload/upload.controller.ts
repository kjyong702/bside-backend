import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multerOptions';
import { UploadService } from './upload.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  @Post()
  @UseGuards(AuthGuard)
  async uploadImages(@UploadedFiles() images: File[]) {
    const uploadedImages = await this.uploadService.createImages(images);

    return {
      status: 200,
      message: '사진 업로드를 성공하였습니다.',
      data: {
        images: uploadedImages,
      },
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteImageById(@Param('id') id: string) {
    return this.uploadService.deleteImage({ id: Number(id) });
  }
}
