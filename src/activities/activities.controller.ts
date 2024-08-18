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
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';
import { ServiceActivities } from './activities.service';
import { IActivities, IActivitiesPatch } from './activities.model';
import { CreateActivitiesDto, PatchActivitiesDto } from './dto/activities.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitieService: ServiceActivities) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateToDo(
    @Request() request: any,
    @Res() response: Response,
    @Body() actDto: CreateActivitiesDto,
  ): Promise<any> {
    try {
      const todo = new IActivities();
      todo.author = {
        connect: {
          id: request.user.id,
        },
      };
      todo.title = actDto.title;
      todo.content = actDto.content;
      todo.links = actDto.links;
      const result = await this.activitieService.createActivitie(todo);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Activitie created!',
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
  async GetAllMyToDos(
    @Request() request: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.activitieService.getAllMyActivities(
        request.user.id,
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Get activities done',
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
  async PatchToDo(
    @Res() response: Response,
    @Body() actDto: PatchActivitiesDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const act = new IActivitiesPatch();

      act.content = actDto.content;
      act.title = actDto.title;
      act.isFavorite = actDto.isFavorite;
      act.fineshedAt = actDto.fineshedAt;
      act.links = actDto.links;

      const result = await this.activitieService.patchActivitie(act, id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Activitie edited!',
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
      const result = await this.activitieService.deleteActivitie(id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Activitie deleted!',
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
