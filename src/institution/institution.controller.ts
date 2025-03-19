import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post()
  createInstitution(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.createInstitution(createInstitutionDto);
  }

  @Get()
  getInstitutions() {
    return this.institutionService.getInstitutions();
  }

  @Get(':id')
  getInstitutionById(@Param('id') id: string) {
    return this.institutionService.getInstitutionById(id);
  }

  @Delete(':id')
  deleteInstitutionById(@Param('id') id: string) {
    return this.institutionService.deleteInstitution(id);
  }

  @Patch(':id')
  updateInstitutionById(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.updateInstitution(id, updateInstitutionDto);
  }
}
