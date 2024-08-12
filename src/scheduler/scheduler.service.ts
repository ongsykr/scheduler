import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerRepository } from './scheduler.repository';
import { TodoDto } from './dto/todo.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { freemem } from 'os';

@Injectable()
export class SchedulerService {
  constructor(private schedulerRepository: SchedulerRepository) {}

  async addTodo(userUuid, todo: TodoDto) {
    return await this.schedulerRepository.addTodo(userUuid, todo);
  }

  async friendRequest(user, receiverId: string, message: string) {
    const receiver = await this.schedulerRepository.findUserById(receiverId);
    return await this.schedulerRepository.createFriendRequest(
      user,
      receiver.uuid,
      message,
    );
  }

  async acceptRequest(requestId: number, request: boolean) {
    const friendRequest =
      await this.schedulerRepository.findFriendRequest(requestId);
    if (!friendRequest) {
      throw new NotFoundException(`${requestId} request doesn't exist.`);
    }
    const senderId = friendRequest.senderUuid;
    const receiverId = friendRequest.receiverUuid;

    if (request) {
      this.schedulerRepository.deleteFriendRequest(requestId);
      return this.schedulerRepository.createFriendShip(senderId, receiverId);
    }
    return console.log(`${receiverId} rejected ${senderId}'s friend request. `);
  }

  async deleteFriend(user, Friend: { friendId: string }) {
    const friend = await this.schedulerRepository.findUserById(Friend.friendId);
    const friendUuid = friend.uuid;
    let friendShip = await this.schedulerRepository.findFriendId(
      user,
      friendUuid,
    );
    if (!friendShip) {
      friendShip = await this.schedulerRepository.findFriendId(
        friendUuid,
        user,
      );
    }
    const id = friendShip.id;
    return await this.schedulerRepository.deleteFriend(id);
  }
}
