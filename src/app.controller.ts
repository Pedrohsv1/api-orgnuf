import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  async DefaultRoute(): Promise<any> {
    return 'API Orgnuf';
  }
}
