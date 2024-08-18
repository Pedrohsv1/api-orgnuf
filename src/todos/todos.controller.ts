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
import { ServiceToDos } from './todos.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { CreateTodoDto, PatchTodoDto } from './dto/todos.dto';
import { Todos, TodosPatch } from './todos.model';
import { Response } from 'express';

@Controller('todos')
export class ToDosController {
  constructor(private readonly todoService: ServiceToDos) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateToDo(
    @Request() request: any,
    @Res() response: Response,
    @Body() todoDto: CreateTodoDto,
  ): Promise<any> {
    try {
      const todo = new Todos();
      todo.author = {
        connect: {
          id: request.user.id,
        },
      };
      todo.title = todoDto.title;
      todo.content = todoDto.content;
      const result = await this.todoService.createTodo(todo);

      return response.status(200).json({
        status: 'Ok!',
        message: 'To do created!',
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
      const result = await this.todoService.getAllMyTodos(request.user.id);
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
  async PatchToDo(
    @Res() response: Response,
    @Body() todoDto: PatchTodoDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const todo = new TodosPatch();

      todo.content = todoDto.content;
      todo.title = todoDto.title;
      todo.isFavorite = todoDto.isFavorite;
      todo.fineshedAt = todoDto.fineshedAt;

      const result = await this.todoService.patchTodo(todo, id);
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
      const result = await this.todoService.deleteTodo(id);
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
