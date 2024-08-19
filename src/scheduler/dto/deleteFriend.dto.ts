import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class deleteFriendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  friendId: string;
}
