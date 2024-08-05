import { IsBoolean, IsNotEmpty } from '@nestjs/class-validator';

export class acceptRequestDto {
  @IsNotEmpty()
  requestId: number;

  @IsNotEmpty()
  @IsBoolean()
  request: boolean;
}
