import { Injectable, Inject } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import {
  HOTDESK_REPOSITORY,
  HotDeskRepository,
} from 'src/core/domain/hotdesk/hotdesk.repository';
import { HotDeskDto } from './dto/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HotDeskExists } from 'src/core/domain/hotdesk/hostdesk.exists';

@Injectable()
export class RegisterHotDeskService {
  constructor(
    @Inject(HOTDESK_REPOSITORY)
    private readonly hotDeskRepository: HotDeskRepository,
  ) {}

  async execute(createHotDeskDto: HotDeskDto): Promise<HotDesk> {
    const hotDeskNumber = HotDeskNumber.create(createHotDeskDto.number);
    const hotDeskExists = new HotDeskExists(this.hotDeskRepository);

    await hotDeskExists.check(hotDeskNumber);
    const hotDesk = new HotDesk(hotDeskNumber);

    return this.hotDeskRepository.save(hotDesk);
  }
}
