import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllusers(@Res() response: Response): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error',
      });
    }
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Res() response: Response,
    @Request() request: any,
  ): Promise<any> {
    try {
      const result = await this.userService.me(request.user.id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error',
      });
    }
  }
}
