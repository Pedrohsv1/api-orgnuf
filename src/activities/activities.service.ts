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

    const filterCheckActivities = MyActivities.atividades.filter((activity) => {
      const isCheckExpired =
        activity.isCheck &&
        new Date(activity.fineshedAt.getTime() + 24 * 60 * 60 * 1000) >
          new Date();

      return !activity.isCheck || isCheckExpired;
    });

    const filterActivities = filterCheckActivities.sort((a, b) => {
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

    return filterActivities;
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
