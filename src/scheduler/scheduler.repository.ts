import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SchedulerService } from './scheduler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';
import { send } from 'process';

@Injectable()
export class SchedulerRepository {
  constructor(private prismaService: PrismaService) {}

  addTodo(userid: string, todo: TodoDto) {
    return this.prismaService.schedule.create({
      data: {
        title: todo.title,
        body: todo.body,
        startingDate: todo.startingDate,
        endingDate: todo.endingDate,
        cycle: todo.cycle,
        bool: false,
        userId: userid,
      },
    });
  }

  createFriendRequest(senderId: string, receiverId: string, message: string) {
    return this.prismaService.friendRequest.create({
      data: {
        senderId,
        receiverId,
        message,
        request: false,
      },
    });
  }

  sendFriendRequest({ friendRequest }) {
    this.prismaService.user.update({
      where: { id: friendRequest.senderId },
      data: {
        friendSendRequests: friendRequest,
      },
    }),
      this.prismaService.user.update({
        where: { id: friendRequest.receiverId },
        data: {
          friendReceiveRequests: friendRequest,
        },
      });

    return;
  }

  acceptRequest(requestId: number, request: boolean) {
    return this.prismaService.friendRequest.update({
      where: { id: requestId },
      data: {
        request,
      },
    });
  }

  createFriendShip(senderId, receiverId) {
    return this.prismaService.friend.create({
      data: {
        userUuid1: senderId,
        userUuid2: receiverId,
      },
    });
  }

  findFriendRequest(requestId: number) {
    return this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
      select: {
        senderId: true,
        receiverId: true,
      },
    });
  }

  deleteFriendRequest(requestId: number) {
    return this.prismaService.friendRequest.delete({
      where: {
        id: requestId,
      },
    });
  }

  findUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
