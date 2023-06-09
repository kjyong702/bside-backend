import { Injectable } from '@nestjs/common';
import { createImageURL } from '../multerOptions';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async createImages(images: File[]) {
    const generatedImages = [];

    for (const image of images) {
      const url = createImageURL(image);
      const createdImage = await this.prisma.image.create({
        data: { url },
      });
      generatedImages.push(createdImage);
      // https://pincock.shop/public/파일이름 으로 최종 변경
      // http://http://13.125.95.255:80/public/파일이름 으로 변경
      // http://localhost:3001/public/파일이름 형식으로 저장
    }
    return generatedImages;
  }

  async deleteImage(where: Prisma.ImageWhereUniqueInput) {
    return this.prisma.image.delete({
      where,
    });
  }
}
