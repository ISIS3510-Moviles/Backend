import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller('visit')
export class VisitController {
  constructor(private visitService: VisitService) {}

  @Post()
  createVisit(@Body() createVisitDto: CreateVisitDto) {
    return this.visitService.createVisit(createVisitDto);
  }

  @Get()
  getVisits() {
    return this.visitService.getVisits();
  }

  @Get(':id')
  getVisitById(@Param('id') id: string) {
    return this.visitService.getVisitById(id);
  }

  @Delete(':id')
  deleteVisitById(@Param('id') id: string) {
    return this.visitService.deleteVisit(id);
  }

  @Patch(':id')
  updateVisitById(
    @Param('id') id: string,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitService.updateVisit(id, updateVisitDto);
  }
}
