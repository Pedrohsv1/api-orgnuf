import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TodosPatch, Todos } from './todos.model';
import { ToDos } from '@prisma/client';

@Injectable()
export class ServiceToDos {
  constructor(private prisma: PrismaService) {}

  async createTodo(data: Todos): Promise<any> {
    return this.prisma.toDos.create({ data });
  }

  async getAllMyTodos(id: string): Promise<ToDos[]> {
    const MyTodos = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        todo: true,
      },
    });

    const filterCheckToDos = MyTodos.todo.filter((todo) => {
      const isCheckExpired =
        todo.isCheck &&
        new Date(todo.fineshedAt.getTime() + 24 * 60 * 60 * 1000) > new Date();

      return !todo.isCheck || isCheckExpired;
    });

    const filteredToDos = filterCheckToDos.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        if (!a.isCheck && b.isCheck) {
          return -1; // a vem antes de b
        } else if (a.isCheck && !b.isCheck) {
          return 1; // b vem antes de a
        } else {
          return -1; // a vem antes de b
        }
      } else if (!a.isFavorite && b.isFavorite) {
        if (!a.isCheck && b.isCheck) {
          return -1; // a vem antes de b
        } else if (a.isCheck && !b.isCheck) {
          return 1; // a vem antes de b
        } else {
          return 1; // b vem antes de a
        }
      } else if (!a.isCheck && b.isCheck) {
        return -1; // a vem antes de b
      } else if (a.isCheck && !b.isCheck) {
        return 1; // b vem antes de a
      } else {
        // Se ambos são favoritos ou nenhum é favorito, ordenar por título
        if (a.createdAt < b.createdAt) {
          return 1;
        } else if (a.createdAt > b.createdAt) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    return filteredToDos;
  }

  async patchTodo(data: TodosPatch, id: string): Promise<any> {
    return this.prisma.toDos.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTodo(id: string): Promise<any> {
    return this.prisma.toDos.delete({
      where: {
        id,
      },
    });
  }
}
