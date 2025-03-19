import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
  getVisitById(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.getVisitById(id);
  }

  @Delete(':id')
  deleteVisitById(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.deleteVisit(id);
  }

  @Patch(':id')
  updateVisitById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitService.updateVisit(id, updateVisitDto);
  }
}
