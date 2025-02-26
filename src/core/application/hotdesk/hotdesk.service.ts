import { Injectable, Inject } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import {
  HOTDESK_REPOSITORY,
  HotDeskRepository,
} from 'src/core/domain/hotdesk/hotdesk.repository';
import { HotDeskDto } from './dto/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HotDeskExists } from 'src/core/domain/hotdesk/hostdesk.exists';
import { HotDeskNumberValid } from 'src/core/domain/hotdesk/hotdesk.number.valid';

@Injectable()
export class RegisterHotDeskService {
  constructor(
    @Inject(HOTDESK_REPOSITORY)
    private readonly hotDeskRepository: HotDeskRepository,
  ) {}

  async execute(createHotDeskDto: HotDeskDto): Promise<HotDesk> {
    const hotDeskNumberValid = new HotDeskNumberValid(this.hotDeskRepository);
    await hotDeskNumberValid.valid(createHotDeskDto.number);

    const hotDeskNumber = HotDeskNumber.create(-1);
    const hotDeskExists = new HotDeskExists(this.hotDeskRepository);
//si existe el hotdesk validarlo acá
    await hotDeskExists.check(hotDeskNumber);
    const hotDesk = new HotDesk(hotDeskNumber);

    return this.hotDeskRepository.save(hotDesk);
  }
}
