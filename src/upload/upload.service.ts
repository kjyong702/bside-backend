import { Injectable } from '@nestjs/common';
import { createImageURL } from '../multerOptions';

@Injectable()
export class UploadService {
  public uploadFiles(files: File[]): string[] {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
      // http://localhost:3001/public/파일이름 형식으로 저장
    }

    return generatedFiles;
  }
}
