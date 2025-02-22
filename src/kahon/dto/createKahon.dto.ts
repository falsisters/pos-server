import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKahonDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
