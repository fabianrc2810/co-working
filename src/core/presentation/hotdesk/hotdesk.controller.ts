/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { HttpResponse } from 'src/core/application/http-response';
import { HotDeskDto } from 'src/core/application/hotdesk/dto/hotdesk';
import { CreateHotDeskCommandHandler } from 'src/core/application/hotdesk/createhotdesk.command-handler';

@Controller('hotdesks')
export class HotDeskController {
  constructor(
    private readonly createHotDeskCommandHandler: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(@Body() request: HotDeskDto): Promise<HttpResponse> {
    try {
      const result = await this.createHotDeskCommandHandler.handle(request);
      return result;
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error['response'] : JSON.stringify(error),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error['status'] || 500,
      );
    }
  }
}
