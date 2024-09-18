import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompletionsGoalsController } from './completions-goals.controller';
import { CompletionsGoalsService } from './completions-goals.service';

@Module({
  controllers: [CompletionsGoalsController],
  providers: [PrismaService, CompletionsGoalsService],
})
export class CompletionsGoalsModule {}
