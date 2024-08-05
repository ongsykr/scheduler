import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchedulerRepository } from './scheduler.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [SchedulerController],
  providers: [SchedulerService, SchedulerRepository],
})
export class SchedulerModule {}
