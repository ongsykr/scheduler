import { Injectable } from '@nestjs/common';
import { PrismaClientRustPanicError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}
}
