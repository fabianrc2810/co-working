/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { CreateOfficeDTO } from 'src/core/application/office/dto/office.dto';
import { CreateOfficeCommandHandler } from 'src/core/application/office/createoffice.command-handler';
import { ErrorResponseFactory } from '../error-response-factory';

@Controller('office')
export class OfficeController {
  constructor(private readonly registerOffice: CreateOfficeCommandHandler) {}

  @Post()
  async register(@Body() request: CreateOfficeDTO): Promise<CreateOfficeDTO> {
    try {
      await this.registerOffice.handle(request);
      return request;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
