import { ApiOperation, ApiProperty, PartialType } from '@nestjs/swagger';
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
import { TodoDto } from './todo.dto';

export class updateScheduleDto extends PartialType(TodoDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  bool?: boolean;
}
