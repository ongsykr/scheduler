import { IsBoolean, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class acceptRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  requestId: number;

  @ApiProperty({ example: 'true' })
  @IsNotEmpty()
  @IsBoolean()
  request: boolean;
}
