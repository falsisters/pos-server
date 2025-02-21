import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  fileName: string;

  file: Express.Multer.File;
}
