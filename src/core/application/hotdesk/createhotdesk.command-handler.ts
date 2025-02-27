import { Injectable, Inject, HttpException } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import {
  HOTDESK_REPOSITORY,
  HotDeskRepository,
} from 'src/core/domain/hotdesk/hotdesk.repository';
import { HotDeskDto } from './dto/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HttpResponse } from '../http-response';

@Injectable()
export class CreateHotDeskCommandHandler {
  constructor(
    @Inject(HOTDESK_REPOSITORY)
    private readonly hotDeskRepository: HotDeskRepository,
  ) {}

  async handle(createHotDeskDto: HotDeskDto): Promise<HttpResponse> {
    const hotDeskNumber = HotDeskNumber.create(createHotDeskDto.number);

    const exists = await this.hotDeskRepository.exists(hotDeskNumber);
    if (exists) {
      throw new HttpException(
        HttpResponse.conflict('HotDesk number already exists.'),
        498,
      );
    }

    const hotDesk = new HotDesk(hotDeskNumber);

    await this.hotDeskRepository.save(hotDesk);

    return HttpResponse.created(hotDesk);
  }
}
