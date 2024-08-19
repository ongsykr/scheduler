import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isStringObject } from 'util/types';

export class friendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @ApiProperty({ example: 'Hi' })
  @IsOptional()
  @IsString()
  message: string;
}
