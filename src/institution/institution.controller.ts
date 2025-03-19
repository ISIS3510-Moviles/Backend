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
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post()
  createInstitution(@Body() CreateInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.createInstitution(CreateInstitutionDto);
  }

  @Get()
  getInstitutions() {
    return this.institutionService.getInstitutions();
  }

  @Get(':id')
  getInstitutionById(@Param('id', ParseIntPipe) id: number) {
    return this.institutionService.getInstitutionById(id);
  }

  @Delete(':id')
  deleteInstitutionById(@Param('id', ParseIntPipe) id: number) {
    return this.institutionService.deleteInstitution(id);
  }

  @Patch(':id')
  updateInstitutionById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.updateInstitution(id, updateInstitutionDto);
  }
}
