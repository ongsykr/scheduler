import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerRepository } from './scheduler.repository';
import { TodoDto } from './dto/todo.dto';
import { updateScheduleDto } from './dto/updateSchedule.dto';
import { scheduleWithFriendDto } from './dto/scheduleWithFriend.dto';

@Injectable()
export class SchedulerService {
  constructor(private schedulerRepository: SchedulerRepository) {}

  async scheduleWithFriend(user: string, data: scheduleWithFriendDto) {
    const friend = await this.schedulerRepository.findUserById(data.friendId);
    if (!(await this.checkFriend(user, friend.uuid))) {
      throw new NotFoundException(`${data.friendId} isn't your friend.`);
    }
    const todo: TodoDto = data;
    this.addTodo(user, todo);
    this.addTodo(friend.uuid, todo);
    return;
  }

  async getSpecSchedule(user: string, id: string) {
    const spec = await this.schedulerRepository.findUserById(id);
    if (!spec) {
      throw new NotFoundException(`${id} doesn't exist.`);
    }
    if (!(await this.checkFriend(user, spec.uuid))) {
      throw new NotFoundException(`${id} isn't your friend.`);
    }
    return this.findAllSchedule(spec.uuid);
  }

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

  async friendRequest(user: string, receiverId: string, message: string) {
    const receiver = await this.schedulerRepository.findUserById(receiverId);
    if (user === receiver.uuid) {
      throw new InternalServerErrorException(
        'cannot send a friend request to yourself.',
      );
    }
    console.log('check friend: ', this.checkFriend(user, receiver.uuid));
    if (await this.checkFriend(user, receiver.uuid)) {
      throw new InternalServerErrorException(
        `Friendship already exists between ${user} and ${receiver.uuid}.`,
      );
    }
    return await this.schedulerRepository.createFriendRequest(
      user,
      receiver.uuid,
      message,
    );
  }

  async acceptRequest(requestId: number, request: boolean) {
    const friendRequest =
      await this.schedulerRepository.findFriendRequest(requestId);
    console.log('friendRequestId = ', friendRequest);
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
    console.log('uuid ', friendUuid);
    let friendShip = await this.schedulerRepository.findFriendId(
      user,
      friendUuid,
    );
    console.log(friendShip);
    if (!friendShip) {
      friendShip = await this.schedulerRepository.findFriendId(
        friendUuid,
        user,
      );
      console.log(friendShip);
    }

    if (!friendShip) {
      throw new NotFoundException(`can't find ${friendId}`);
    }

    const id = friendShip.id;
    console.log(id);
    return await this.schedulerRepository.deleteFriend(id);
  }

  async updateSchedule(
    user: string,
    id: number,
    updateData: updateScheduleDto,
  ) {
    if (this.schedulerRepository.findSchedule(user, id)) {
      throw new NotFoundException(`${id} schedule doesn't exist.`);
    }
    return this.schedulerRepository.updateSchedule(user, id, updateData);
  }

  async deleteSchedule(user: string, id: number) {
    const schedule = await this.schedulerRepository.findSchedule(user, id);
    console.log(schedule);
    if (!schedule) {
      throw new NotFoundException(`${user}'s ${id} schedule doesn't exist.`);
    }
    return await this.schedulerRepository.deleteSchedule(user, id);
  }

  async checkFriend(user: string, id: string): Promise<boolean> {
    let friend = await this.schedulerRepository.findFriendShip(user, id);
    console.log('friend: ', friend);
    if (!friend) {
      friend = await this.schedulerRepository.findFriendShip(id, user);
    }
    return !!friend;
  }
}
