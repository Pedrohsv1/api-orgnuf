import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Activities } from '@prisma/client';
import { IActivities, IActivitiesPatch } from './activities.model';

@Injectable()
export class ServiceActivities {
  constructor(private prisma: PrismaService) {}

  async createActivitie(data: IActivities): Promise<any> {
    return this.prisma.activities.create({ data });
  }

  async getAllMyActivities(id: string): Promise<Activities[]> {
    const MyActivities = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        atividades: {
          include: {
            links: true,
          },
        },
      },
    });

    return MyActivities.atividades;
  }

  async patchActivitie(data: IActivitiesPatch, id: string): Promise<any> {
    return this.prisma.activities.update({
      where: {
        id,
      },
      data,
      include: {
        links: true,
      },
    });
  }

  async deleteActivitie(id: string): Promise<any> {
    return this.prisma.activities.delete({
      where: {
        id,
      },
    });
  }
}
