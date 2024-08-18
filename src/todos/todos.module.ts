import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ToDosController } from './todos.controller';
import { ServiceToDos } from './todos.service';

@Module({
  controllers: [ToDosController],
  providers: [PrismaService, ServiceToDos],
})
export class ToDosModule {}
