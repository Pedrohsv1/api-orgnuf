import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActivitiesController } from './activities.controller';
import { ServiceActivities } from './activities.service';

@Module({
  controllers: [ActivitiesController],
  providers: [PrismaService, ServiceActivities],
})
export class ActivitiesModule {}
