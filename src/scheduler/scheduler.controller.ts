import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TodoDto } from './dto/todo.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { friendRequestDto } from './dto/friendRequest.dto';
import { acceptRequestDto } from './dto/acceptRequest.dto';

@UseGuards(AuthGuard)
@Controller('scheduler')
export class SchedulerController {
  constructor(private schedulerService: SchedulerService) {}

  @Post('/add')
  addTodo(@Body() body: TodoDto) {
    return this.schedulerService.addTodo(body);
  }

  @Post('/friend/Request')
  friendRequest(@Body() body: friendRequestDto) {
    return this.schedulerService.friendRequest(body.receiverId, body.message);
  }

  @Post('/friend/accept')
  acceptRequest(@Body() body: acceptRequestDto) {
    return this.schedulerService.acceptRequest(body.requestId, body.request);
  }
}
