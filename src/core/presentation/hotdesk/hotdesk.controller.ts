/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { CommandHandlerResponse } from 'src/core/application/command-handler.response';
import { HotDeskDto } from 'src/core/application/hotdesk/dto/hotdesk';
import { CreateHotDeskCommandHandler } from 'src/core/application/hotdesk/createhotdesk.command-handler';

@Controller('hotdesks')
export class HotDeskController {
  constructor(
    private readonly createHotDeskCommandHandler: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(@Body() request: HotDeskDto): Promise<CommandHandlerResponse> {
    try {
      const result = await this.createHotDeskCommandHandler.handle(request);
      return result;
    } catch (error) {
      throw CommandHandlerResponse.throwError(error);
    }
  }
}
