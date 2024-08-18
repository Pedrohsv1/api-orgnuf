import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LinksPatch } from './links.model';

@Injectable()
export class ServiceLinks {
  constructor(private prisma: PrismaService) {}

  async patchLink(data: LinksPatch, id: string): Promise<any> {
    return this.prisma.links.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteLink(id: string): Promise<any> {
    return this.prisma.links.delete({
      where: {
        id,
      },
    });
  }
}
