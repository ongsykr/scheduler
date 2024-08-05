import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { isStringObject } from 'util/types';

export class friendRequestDto {
  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @IsOptional()
  @IsString()
  message: string;
}
