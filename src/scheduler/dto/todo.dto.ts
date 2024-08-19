import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  body: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startingDate: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  endingDate: Date;

  @ApiProperty({ example: '4', required: false })
  @IsInt()
  @IsOptional()
  cycle: number;
}
