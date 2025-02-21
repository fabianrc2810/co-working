import { Controller, Post, Body } from '@nestjs/common';
import { HotDeskDto } from 'src/core/application/hotdesk/dto/hotdesk';
import { RegisterHotDeskService } from 'src/core/application/hotdesk/hotdesk.service';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';

@Controller('hotdesks')
export class HotDeskController {
  constructor(
    private readonly registerHotDeskService: RegisterHotDeskService,
  ) {}

  @Post()
  async register(@Body() createHotDeskDto: HotDeskDto): Promise<HotDesk> {
    return this.registerHotDeskService.execute(createHotDeskDto);
  }
}
