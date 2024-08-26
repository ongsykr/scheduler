import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

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
  @IsDateString()
  @IsNotEmpty()
  startingDate: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endingDate: string;

  @ApiProperty({ example: '4', required: false })
  @IsInt()
  @IsOptional()
  cycle: number;
}
