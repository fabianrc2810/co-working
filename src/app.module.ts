import { Module } from '@nestjs/common';
import { HotDeskModule } from './hotdesk.module';

@Module({
  imports: [HotDeskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
