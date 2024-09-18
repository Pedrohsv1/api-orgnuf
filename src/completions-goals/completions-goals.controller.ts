import { Controller } from "@nestjs/common";
import { CompletionsGoalsService } from "./completions-goals.service";
import { CreateCompletionGoalDto } from "./dto/completions-goals.dto";
import { CompletionGoal } from "./completions-goals.model";
import { Body, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { Get } from "@nestjs/common";

@Controller('completions-goals')
export class CompletionsGoalsController {
  constructor(private readonly completionsGoalsService: CompletionsGoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCompletionGoal(@Body() completionGoal: CreateCompletionGoalDto): Promise<any> {
    const completion = new CompletionGoal();

    console.log(completionGoal);

    completion.goal = {
      connect: {
        id: completionGoal.goalId,
      },
    };

    const result = await this.completionsGoalsService.createCompletionGoal(completion);

    return {
      status: 'Ok!',
      message: 'Completion goal created!',
      result: result,
    };
  }

  @Get('last-15-days')
  @UseGuards(JwtAuthGuard)
  async getCompletionGoalsLast15Days(): Promise<any> {
    const result = await this.completionsGoalsService.getCompletionGoalsLast15Days();
    return {
      status: 'Ok!',
      message: 'Completion goals last 15 days!',
      result: result,
    };
  }
}