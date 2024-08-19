import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async createUser(id: string, password: string, name: string) {
    return this.prismaService.user
      .create({
        data: {
          id,
          password,
          name,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException(`User ${id} already exists.`);
          }
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async findUser(id: string) {
    return this.prismaService.user
      .findUnique({ where: { id }, select: { uuid: true, password: true } })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error');
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async findUserByUuid(uuid: string) {
    const user = await this.prismaService.user.findUnique({ where: { uuid } });
    return user;
    //   return await this.prismaService.user
    //     .findFirst({ where: { uuid } })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error instanceof PrismaClientKnownRequestError) {
    //         throw new InternalServerErrorException(
    //           'findUserByUuid -> database error',
    //         );
    //       }
    //       throw new InternalServerErrorException(
    //         'findUserByUuid-> unknown error',
    //       );
    //     });
  }
}
