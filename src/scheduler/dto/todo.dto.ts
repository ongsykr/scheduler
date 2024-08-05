import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsDate()
  @IsNotEmpty()
  startingDate: Date;

  @IsDate()
  @IsOptional()
  endingDate: Date;

  @IsInt()
  @IsOptional()
  cycle: number;
}
