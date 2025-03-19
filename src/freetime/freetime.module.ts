import { Module } from '@nestjs/common';
import { FreeTimeService } from './freetime.service';
import { FreeTimeController } from './freetime.controller';

@Module({
  controllers: [FreeTimeController],
  providers: [FreeTimeService],
})
export class FreeTimeModule {}
