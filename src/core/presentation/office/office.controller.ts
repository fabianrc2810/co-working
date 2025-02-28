/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { CommandHandlerResponse } from 'src/core/application/command-handler.response';
import { CreateOfficeDTO } from 'src/core/application/office/dto/office.dto';
import { CreateOfficeCommandHandler } from 'src/core/application/office/createoffice.command-handler';

@Controller('office')
export class OfficeController {
  constructor(private readonly registerOffice: CreateOfficeCommandHandler) {}

  @Post()
  async register(
    @Body() office: CreateOfficeDTO,
  ): Promise<CommandHandlerResponse> {
    try {
      const result = await this.registerOffice.handle(office);
      return result;
    } catch (error) {
      throw CommandHandlerResponse.throwError(error);
    }
  }
}
