import { Injectable, Inject } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import {
  HOTDESK_REPOSITORY,
  HotDeskRepository,
} from 'src/core/domain/hotdesk/hotdesk.repository';
import { HotDeskDto } from './dto/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { CommandHandlerResponse } from '../command-handler.response';
import { HotDeskNumberDuplicatedException } from './hotdesk.exception';

@Injectable()
export class CreateHotDeskCommandHandler {
  constructor(
    @Inject(HOTDESK_REPOSITORY)
    private readonly hotDeskRepository: HotDeskRepository,
  ) {}

  async handle(createHotDeskDto: HotDeskDto): Promise<CommandHandlerResponse> {
    const hotDeskNumber = HotDeskNumber.create(createHotDeskDto.number);

    const exists = await this.hotDeskRepository.exists(hotDeskNumber);
    if (exists) {
      throw HotDeskNumberDuplicatedException.withHotDeskNumber(hotDeskNumber);
    }

    const hotDesk = new HotDesk(hotDeskNumber);

    await this.hotDeskRepository.save(hotDesk);

    return CommandHandlerResponse.created(hotDesk);
  }
}
