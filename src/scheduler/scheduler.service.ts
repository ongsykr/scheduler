import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerRepository } from './scheduler.repository';
import { TodoDto } from './dto/todo.dto';
import { updateScheduleDto } from './dto/updateSchedule.dto';
import { freemem } from 'os';

@Injectable()
export class SchedulerService {
  constructor(private schedulerRepository: SchedulerRepository) {}

  findAllSchedule(user: string) {
    return this.schedulerRepository.findAllSchedule(user);
  }

  async findAllFriend(user: string) {
    const friendUuid1 = await this.schedulerRepository.findAllFriend1(user);
    const friendUuid2 = await this.schedulerRepository.findAllFriend2(user);

    const friend1 = await Promise.all(
      friendUuid1.map((friend) =>
        this.schedulerRepository.findUserIdByUUid(friend.userUuid2),
      ),
    );
    const friend2 = await Promise.all(
      friendUuid2.map((friend) =>
        this.schedulerRepository.findUserIdByUUid(friend.userUuid1),
      ),
    );

    const friends = [...friend1, ...friend2];
    return friends;
  }

  async addTodo(userUuid: string, todo: TodoDto) {
    return await this.schedulerRepository.addTodo(userUuid, todo);
  }

  async friendRequest(user, receiverId: string, message: string) {
    const receiver = await this.schedulerRepository.findUserById(receiverId);
    if (user === receiver) {
      throw new BadRequestException(
        'cannot send a friend request to yourself.',
      );
    }
    return await this.schedulerRepository.createFriendRequest(
      user,
      receiver.uuid,
      message,
    );
  }

  async acceptRequest(requestId: number, request: boolean) {
    console.log(request);
    const friendRequest =
      await this.schedulerRepository.findFriendRequest(requestId);
    if (!friendRequest) {
      throw new NotFoundException(`${requestId} request doesn't exist.`);
    }
    const senderId = friendRequest.senderUuid;
    const receiverId = friendRequest.receiverUuid;

    if (request) {
      await this.schedulerRepository.deleteFriendRequest(requestId);
      console.log('delete friendrequest');
      return await this.schedulerRepository.createFriendShip(
        senderId,
        receiverId,
      );
    }
    return console.log(`${receiverId} rejected ${senderId}'s friend request. `);
  }

  async deleteFriend(user, friendId: string) {
    const friend = await this.schedulerRepository.findUserById(friendId);
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

  async updateSchedule(user, id: number, updateData: updateScheduleDto) {
    return this.schedulerRepository.updateSchedule(user, id, updateData);
  }

  async deleteSchedule(user, id: number) {
    const schedule = await this.schedulerRepository.findSchedule(user, id);
    if (!schedule) {
      throw new NotFoundException(`${user}'s ${id} schedule doesn't exist.`);
    }
    return this.schedulerRepository.deleteSchedule(user, id);
  }
}
