import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HotDeskDto } from 'src/core/application/hotdesk/dto/hotdesk';
import { CreateHotDeskCommandHandler } from 'src/core/application/hotdesk/createhotdesk.command-handler';
import { ResponseBody } from '../response';

@Controller('hotdesks')
export class HotDeskController {
  constructor(
    private readonly createHotDeskCommandHandler: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(@Body() request: HotDeskDto): Promise<ResponseBody> {
    try {
      await this.createHotDeskCommandHandler.handle(request);
      return ResponseBody.created({
        message: `HotDesk '${request.number}' created successfully.`,
      });
    } catch (error) {
      throw new HttpException(
        ResponseBody.internalServerError({
          status: (error as HttpException).getStatus(),
          message: (error as HttpException).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
