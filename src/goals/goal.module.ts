import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GoalController } from './goal.controller';
import { ServiceGoals } from './goals.service';

@Module({
  controllers: [GoalController],
  providers: [PrismaService, ServiceGoals],
})
export class GoalsModule {}
