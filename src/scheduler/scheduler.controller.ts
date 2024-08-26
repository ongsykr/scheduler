import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { friendRequestDto } from './dto/friendRequest.dto';
import { acceptRequestDto } from './dto/acceptRequest.dto';
import { getUser } from 'src/auth/guard/decorator/getUser.decorator';
import { deleteFriendDto } from './dto/deleteFriend.dto';
import { updateScheduleDto } from './dto/updateSchedule.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { scheduleWithFriendDto } from './dto/scheduleWithFriend.dto';

@UseGuards(JwtAuthGuard)
@Controller('scheduler')
export class SchedulerController {
  constructor(private schedulerService: SchedulerService) {}

  @Post('/add')
  @ApiOperation({ summary: 'add to do' })
  @ApiBody({ type: TodoDto })
  addTodo(@getUser() user: string, @Body() body: TodoDto) {
    return this.schedulerService.addTodo(user, body);
  }

  @Post('/friend/request')
  @ApiOperation({ summary: 'Send a friend request.' })
  @ApiBody({ type: friendRequestDto })
  friendRequest(@getUser() user: string, @Body() body: friendRequestDto) {
    return this.schedulerService.friendRequest(
      user,
      body.receiverId,
      body.message,
    );
  }

  @Post('/friend/accept')
  @ApiOperation({ summary: 'accept the friend request.' })
  @ApiBody({ type: acceptRequestDto })
  acceptRequest(@Body() body: acceptRequestDto) {
    console.log(body.request);
    return this.schedulerService.acceptRequest(body.requestId, body.request);
  }

  @Delete('/friend/:friendId')
  @ApiOperation({ summary: 'delete friend.' })
  @ApiBody({ type: deleteFriendDto })
  deletefriend(@getUser() user: string, @Param('friendId') friendId: string) {
    return this.schedulerService.deleteFriend(user, friendId);
  }

  @Put('/update')
  @ApiOperation({ summary: 'update todo data.' })
  @ApiBody({ type: updateScheduleDto })
  updateSchedule(@getUser() user: string, @Body() body: updateScheduleDto) {
    return this.schedulerService.updateSchedule(user, body.id, body);
  }

  @Delete('/schedule/:id')
  @ApiOperation({ summary: 'delete schedule by id' })
  deleteSchedule(@getUser() user: string, @Param('id') id: number) {
    console.log(user, id);
    return this.schedulerService.deleteSchedule(user, id);
  }

  @Get('/all')
  @ApiOperation({ summary: 'all schedules' })
  findAllSchedule(@getUser() user: string) {
    return this.schedulerService.findAllSchedule(user);
  }

  @Get('/friends')
  @ApiOperation({ summary: 'all friends' })
  findAllFriend(@getUser() user: string) {
    return this.schedulerService.findAllFriend(user);
  }

  @Get('/schedule/:id')
  @ApiOperation({ summary: "get someone's schedule" })
  async getSpecSchedule(@getUser() user: string, @Param('id') id: string) {
    return await this.schedulerService.getSpecSchedule(user, id);
  }

  @Post('/schedule/friend')
  @ApiOperation({ summary: 'create schedule with friend' })
  @ApiBody({ type: scheduleWithFriendDto })
  schedulewithFriend(
    @getUser() user: string,
    @Body() body: scheduleWithFriendDto,
  ) {
    return this.schedulerService.scheduleWithFriend(user, body);
  }
}
