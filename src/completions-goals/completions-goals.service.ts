import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import type { CompletionGoal, CompletionGoalResponse } from "./completions-goals.model";
import { Prisma } from "@prisma/client";
import * as dayjs from "dayjs";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);
dayjs.locale("pt-br");

@Injectable()
export class CompletionsGoalsService {
  constructor(private prisma: PrismaService) {}

  async createCompletionGoal(data: CompletionGoal): Promise<CompletionGoalResponse> {

    const createData: Prisma.CompletionGoalsCreateInput = {
      goal: { connect: { id: data.goal.connect.id } },
    };

    const result = await this.prisma.completionGoals.create({ data: createData });
    return result;
  }

 

  async getCompletionGoalsLast15Days() {
    const today = dayjs();
  const fifteenDaysAgo = today.subtract(15, 'day');

    const completionGoals = await this.prisma.completionGoals.findMany({
      where: {
        createdAt: {
          gte: fifteenDaysAgo.toDate(),
          lte: today.toDate(),
        },
      },
      include: {
        goal: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const allGoals = await this.prisma.goals.findMany({
      select: { id: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    let goalCount = 0;
    const groupedResults = completionGoals.reduce((acc, completionGoal) => {
      const date = dayjs(completionGoal.createdAt).format('YYYY-MM-DD');
      
      // Update goalCount based on goals created on or before this date
      for (let i = 0; i < allGoals.length; i++) {
        if (dayjs(allGoals[i].createdAt).isSameOrBefore(dayjs(completionGoal.createdAt).subtract(3, 'hour'), 'day')) {
          goalCount++;
        } else {
          break;
        }
      }

      if (!acc[date]) {
        acc[date] = { goals: [], count: 0, totalGoals: goalCount };
      }
      acc[date].goals.push(completionGoal);
      acc[date].count++;
      acc[date].totalGoals = goalCount;
      return acc;
    }, {});

    return groupedResults;
  }

}

