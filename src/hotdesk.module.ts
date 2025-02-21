import { Module } from '@nestjs/common';
import { RegisterHotDeskService } from './core/application/hotdesk/hotdesk.service';
import { InMemoryHotDeskRepository } from './core/infrastructure/hotdesk/hotdesk.inmemory.repository';
import { HotDeskController } from './core/presentation/hotdesk/hotdesk.controller';
import { HOTDESK_REPOSITORY } from './core/domain/hotdesk/hotdesk.repository';

@Module({
  controllers: [HotDeskController],
  providers: [
    RegisterHotDeskService,
    {
      provide: HOTDESK_REPOSITORY,
      useClass: InMemoryHotDeskRepository,
    },
  ],
  exports: [HOTDESK_REPOSITORY], // Exportamos el proveedor para otros módulos
})
export class HotDeskModule {}
