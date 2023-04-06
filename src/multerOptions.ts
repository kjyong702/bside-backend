import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import uuidRandom from './uuidRandom';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new BadRequestException('지원하지 않는 이미지 형식입니다.'),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시 생성
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, uuidRandom(file));
    },
  }),
};

export const createImageURL = (file): string => {
  // const serverAddress = 'http://localhost:3001';
  // const serverAddress = 'http://13.125.95.255:80'; // 1차 배포 주소
  const serverAddress = 'https://pincock.shop'; // 최종 api 배포 주소

  // 파일이 저장 경로: 서버주소/public
  return `${serverAddress}/public/${file.filename}`;
};
