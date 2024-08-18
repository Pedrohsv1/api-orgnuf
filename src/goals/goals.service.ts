import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GoalPatch, Goal } from './goals.model';
import { Goals } from '@prisma/client';

@Injectable()
export class ServiceGoals {
  constructor(private prisma: PrismaService) {}

  async createGoal(data: Goal): Promise<Goals> {
    return this.prisma.goals.create({ data });
  }

  async getAllMyGoals(id: string): Promise<Goals[]> {
    const MyGoals = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        goals: true,
      },
    });

    return MyGoals.goals;
  }

  async patchGoal(data: GoalPatch, id: string): Promise<any> {
    return this.prisma.goals.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteGoal(id: string): Promise<Goals> {
    return this.prisma.goals.delete({
      where: {
        id,
      },
    });
  }
}
