import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { friendRequestDto } from './dto/friendRequest.dto';
import { acceptRequestDto } from './dto/acceptRequest.dto';
import { getUser } from 'src/auth/guard/decorator/getUser.decorator';

@UseGuards(JwtAuthGuard)
@Controller('scheduler')
export class SchedulerController {
  constructor(private schedulerService: SchedulerService) {}

  @Post('/add')
  addTodo(@getUser() user, @Body() body: TodoDto) {
    return this.schedulerService.addTodo(user, body);
  }

  @Post('/friend/Request')
  friendRequest(@getUser() user, @Body() body: friendRequestDto) {
    return this.schedulerService.friendRequest(
      user,
      body.receiverId,
      body.message,
    );
  }

  @Post('/friend/accept')
  acceptRequest(@Body() body: acceptRequestDto) {
    return this.schedulerService.acceptRequest(body.requestId, body.request);
  }

  @Delete('/friend/delete')
  deletefriend(@getUser() user, @Body() friendId: string) {
    return this.schedulerService.deleteFriend(user, { friendId });
  }
}
