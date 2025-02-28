/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { HotDeskDto } from 'src/core/application/hotdesk/dto/hotdesk';
import { CreateHotDeskCommandHandler } from 'src/core/application/hotdesk/createhotdesk.command-handler';
import { ErrorResponseFactory } from '../error-response-factory';

@Controller('hotdesks')
export class HotDeskController {
  constructor(
    private readonly createHotDeskCommandHandler: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(@Body() request: HotDeskDto): Promise<HotDeskDto> {
    try {
      await this.createHotDeskCommandHandler.handle(request);
      return request;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
