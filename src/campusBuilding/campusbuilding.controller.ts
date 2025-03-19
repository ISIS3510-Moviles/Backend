import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CampusBuildingService } from 'src/campusBuilding/campusbuilding.service';
import { CreateCampusBuildingDto } from 'src/campusBuilding/dto/create-campus-building.dto';
import { UpdateCampusBuildingDto } from 'src/campusBuilding/dto/update-campus-building.dto';

@Controller('campus-building')
export class CampusBuildingController {
  constructor(private readonly campusBuildingService: CampusBuildingService) {}

  @Post()
  createCampusBuilding(@Body() createCampusBuildingDto: CreateCampusBuildingDto) {
    return this.campusBuildingService.createCampusBuilding(createCampusBuildingDto);
  }

  @Get()
  getCampusBuildings() {
    return this.campusBuildingService.getCampusBuildings();
  }

  @Get(':id')
  getCampusBuildingById(@Param('id') id: string) {
    return this.campusBuildingService.getCampusBuildingById(id);
  }

  @Delete(':id')
  deleteCampusBuilding(@Param('id') id: string) {
    return this.campusBuildingService.deleteCampusBuilding(id);
  }

  @Patch(':id')
  updateCampusBuilding(
    @Param('id') id: string,
    @Body() updateCampusBuildingDto: UpdateCampusBuildingDto,
  ) {
    return this.campusBuildingService.updateCampusBuilding(id, updateCampusBuildingDto);
  }
}
