import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FreeTimeService } from './freetime.service';
import { CreateFreeTimeDto } from './dto/create-free-time.dto';

@Controller('free-time')
export class FreeTimeController {
  constructor(private readonly freeTimeService: FreeTimeService) {}

  @Post()
  createFreeTime(@Body() createFreeTimeDto: CreateFreeTimeDto) {
    return this.freeTimeService.createFreeTime(createFreeTimeDto);
  }

  @Get()
  getFreeTimes() {
    return this.freeTimeService.getFreeTimes();
  }

  @Get(':id')
  getFreeTimeById(@Param('id') id: string) {
    return this.freeTimeService.getFreeTimeById(id);
  }

  @Delete(':id')
  deleteFreeTime(@Param('id') id: string) {
    return this.freeTimeService.deleteFreeTime(id);
  }

  @Patch(':id')
  updateFreeTime(@Param('id') id: string, @Body() updateFreeTimeDto: Partial<CreateFreeTimeDto>) {
    return this.freeTimeService.updateFreeTime(id, updateFreeTimeDto);
  }
}
