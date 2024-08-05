import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class refreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh: string;
}
