import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
