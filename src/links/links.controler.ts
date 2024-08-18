import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';
import { ServiceLinks } from './links.service';
import { PatchLinkTdo } from './dto/links.dto';
import { LinksPatch } from './links.model';

@Controller('links')
export class LinksController {
  constructor(private readonly linkService: ServiceLinks) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async PatchToDo(
    @Res() response: Response,
    @Body() linkTdo: PatchLinkTdo,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const link = new LinksPatch();

      link.name = linkTdo.name;
      link.link = linkTdo.link;

      const result = await this.linkService.patchLink(link, id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Link edited!',
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
      const result = await this.linkService.deleteLink(id);
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
