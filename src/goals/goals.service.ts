import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GoalPatch, Goal } from './goals.model';
import { Goals } from '@prisma/client';
import * as dayjs from 'dayjs';

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

  async getTodaysGoals(id: string): Promise<(Goals & { isCompleted: boolean })[]> {
    const allGoals = await this.getAllMyGoals(id);
    const today = dayjs().startOf('day');
    const todayIndex = today.day() === 0 ? 7 : today.day(); // Convert Sunday from 0 to 7
  
    const goalsWithCompletions = await Promise.all(allGoals
      .filter(goal => goal.days.includes(todayIndex))
      .map(async goal => {
        const completion = await this.prisma.completionGoals.findFirst({
          where: {
            goalId: goal.id,
            createdAt: {
              gte: today.toDate(),
              lt: today.add(1, 'day').toDate(),
            },
          },
        });
  
        return {
          ...goal,
          isCompleted: !!completion,
        };
      }));
  
    return goalsWithCompletions;
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
