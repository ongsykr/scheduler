import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class refreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh: string;
}
