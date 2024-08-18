import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServiceGoals } from './goals.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { CreateGoalDto, PatchGoalDto } from './dto/todos.dto';
import { Goal, GoalPatch } from './goals.model';
import { Response } from 'express';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: ServiceGoals) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateGoal(
    @Request() request: any,
    @Res() response: Response,
    @Body() GoalDto: CreateGoalDto,
  ): Promise<any> {
    try {
      const goal = new Goal();

      goal.author = {
        connect: {
          id: request.user.id,
        },
      };
      goal.title = GoalDto.title;
      goal.days = GoalDto.days;

      const result = await this.goalService.createGoal(goal);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Goal created!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Error server!',
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetAllMyGoals(
    @Request() request: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.goalService.getAllMyGoals(request.user.id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'To do created!',
        result: result,
      });
    } catch {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Error server!',
      });
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async PatchGoal(
    @Res() response: Response,
    @Body() goalDto: PatchGoalDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const goal = new GoalPatch();

      goal.title = goalDto.title;
      goal.isFavorite = goalDto.isFavorite;
      goal.fineshedAt = goalDto.fineshedAt;
      goal.days = goalDto.days;

      const result = await this.goalService.patchGoal(goal, id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'To do edited!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Error server!',
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async DeleteToDo(
    @Res() response: Response,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const result = await this.goalService.deleteGoal(id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'To do deleted!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Error server!',
      });
    }
  }
}
