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

    const FilteredToDos = MyTodos.todo.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1; // a vem antes de b
      } else if (!a.isFavorite && b.isFavorite) {
        return 1; // b vem antes de a
      } else {
        // Se ambos são favoritos ou nenhum é favorito, ordenar por título
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    return FilteredToDos;
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
