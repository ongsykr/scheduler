import {
  IsNotEmpty,
  IsString,
  IsSurrogatePair,
  MaxLength,
} from '@nestjs/class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
