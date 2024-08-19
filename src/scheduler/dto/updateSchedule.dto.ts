import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  startingDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  endingDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  cycle?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  bool?: boolean;
}
