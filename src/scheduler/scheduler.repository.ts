import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';
import { error } from 'console';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SchedulerRepository {
  constructor(private prismaService: PrismaService) {}

  addTodo(userid: string, todo: TodoDto) {
    return this.prismaService.schedule
      .create({
        data: {
          title: todo.title,
          body: todo.body,
          startingDate: todo.startingDate,
          endingDate: todo.endingDate,
          cycle: todo.cycle,
          bool: false,
          user: {
            connect: {
              uuid: userid,
            },
          },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in addTodo');
        }
        throw new InternalServerErrorException('unknown error in addTodo');
      });
  }

  createFriendRequest(
    senderUuid: string,
    receiverUuid: string,
    message: string,
  ) {
    return this.prismaService.friendRequest
      .create({
        data: {
          senderUuid,
          receiverUuid,
          message,
          request: false,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in createFriendRequest',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in createFriendRequest',
        );
      });
  }

  acceptRequest(requestId: number, request: boolean) {
    return this.prismaService.friendRequest
      .update({
        where: { id: requestId },
        data: {
          request,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in acceptRequest',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in acceptRequest',
        );
      });
  }

  createFriendShip(senderId, receiverId) {
    return this.prismaService.friend
      .create({
        data: {
          userUuid1: senderId,
          userUuid2: receiverId,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in createFriendShip',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in createFriendShip',
        );
      });
  }

  findFriendRequest(requestId: number) {
    return this.prismaService.friendRequest
      .findUnique({
        where: { id: requestId },
        select: {
          senderUuid: true,
          receiverUuid: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findFriendRequest',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in findFriendRequest',
        );
      });
  }

  deleteFriendRequest(requestId: number) {
    return this.prismaService.friendRequest
      .delete({
        where: {
          id: requestId,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in deleteFriendRequest',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in deleteFriendRequest',
        );
      });
  }

  findUserById(id: string) {
    return this.prismaService.user
      .findUnique({
        where: { id },
        select: { uuid: true },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findUserById',
          );
        }
        throw new InternalServerErrorException('unknown error in findUserById');
      });
  }

  deleteFriend(id: number) {
    return this.prismaService.friend
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in deleteFriend',
          );
        }
        throw new InternalServerErrorException('unknown error in deleteFriend');
      });
  }

  findFriendId(user1: string, user2: string) {
    return this.prismaService.friend
      .findFirst({
        where: {
          userUuid1: user1,
          userUuid2: user2,
        },
        select: { id: true },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findFriendId',
          );
        }
        throw new InternalServerErrorException('unknown error in findFriendId');
      });
  }
}
