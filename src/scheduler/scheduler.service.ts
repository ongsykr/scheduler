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

@Injectable()
export class SchedulerService {
  constructor(
    private schedulerRepository: SchedulerRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  addTodo(todo: TodoDto) {
    return this.schedulerRepository.addTodo(userUuid, todo);
  }

  friendRequest(receiverId: string, message: string) {
    const senderId = 'user'; //** */
    const friendRequest = this.schedulerRepository.createFriendRequest(
      receiverId,
      senderId,
      message,
    );
    return this.schedulerRepository.sendFriendRequest({ friendRequest });
  }

  async acceptRequest(requestId: number, request: boolean) {
    const friendRequest =
      await this.schedulerRepository.findFriendRequest(requestId);
    if (!friendRequest) {
      throw new NotFoundException(`${requestId} request doesn't exist.`);
    }
    const senderId = friendRequest.senderId;
    const receiverId = friendRequest.receiverId;
    if (request) {
      this.schedulerRepository.deleteFriendRequest(requestId);
      return this.schedulerRepository.createFriendShip(senderId, receiverId);
    }
  }

  async getUserUUIDFromToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
      });

      const user = await this.schedulerRepository.findUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user.uuid;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
