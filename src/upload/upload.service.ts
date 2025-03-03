import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/uploadFile.dto';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly defaultBucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: `${process.env.AWS_REGION}`,
      credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
      }, // yes
    });

    this.defaultBucket = `${process.env.AWS_BUCKET_NAME}`;
  }

  async getSignedUrl(key: string, expiresIn: number = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.defaultBucket,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getPublicUrl(key: string) {
    return `https://${this.defaultBucket}.s3.amazonaws.com/${key}`;
  }

  async uploadSingleFile(data: UploadFileDto) {
    const { path, fileName, file } = data;
    const key = `${path}/${Date.now()}-${fileName}`;

    try {
      // Compress the file using sharp by converting it to JPG
      const compressedFile = await sharp(file.buffer)
        .jpeg({ quality: 85 })
        .toBuffer();

      const command = new PutObjectCommand({
        Bucket: this.defaultBucket,
        Key: key,
        Body: compressedFile,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return this.getPublicUrl(key);
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadAttachments(data: UploadFileDto[]) {
    const promises = data.map((file) => this.uploadSingleFile(file));
    return await Promise.all(promises);
  }
}
