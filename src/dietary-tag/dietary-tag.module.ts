import { Module } from '@nestjs/common';
import { DietaryTagService } from './dietary-tag.service';
import { DietaryTagController } from './dietary-tag.controller';

@Module({
  controllers: [DietaryTagController],
  providers: [DietaryTagService],
  exports: [DietaryTagService],
})
export class DietaryTagModule {}
