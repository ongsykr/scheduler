import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({ example: 'aaa' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ maxLength: 4, example: '1234' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: 'seongyeon' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
