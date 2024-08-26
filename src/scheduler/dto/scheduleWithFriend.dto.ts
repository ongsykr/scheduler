import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TodoDto } from './todo.dto';
import { deleteFriendDto } from './deleteFriend.dto';

export class scheduleWithFriendDto extends IntersectionType(
  TodoDto,
  deleteFriendDto,
) {}
