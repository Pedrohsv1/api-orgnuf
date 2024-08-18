import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LinksController } from './links.controler';
import { ServiceLinks } from './links.service';

@Module({
  controllers: [LinksController],
  providers: [PrismaService, ServiceLinks],
})
export class LinksModule {}
