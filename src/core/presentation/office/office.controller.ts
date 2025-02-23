import { Controller, Post, Body } from '@nestjs/common';
import { CreateOfficeDTO } from 'src/core/application/office/dto/office.dto';
import { OfficeService } from 'src/core/application/office/office.service';
import { Office } from 'src/core/domain/office/office';

@Controller('office')
export class OfficeController {
  constructor(private readonly registerOffice: OfficeService) {}

  @Post()
  async register(@Body() office: CreateOfficeDTO): Promise<Office> {
    return this.registerOffice.execute(office);
  }
}
