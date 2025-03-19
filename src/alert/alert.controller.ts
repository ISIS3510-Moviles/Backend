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
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  createAlert(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.createAlert(createAlertDto);
  }

  @Get()
  getAlerts() {
    return this.alertService.getAlerts();
  }

  @Get(':id')
  getAlertById(@Param('id', ParseIntPipe) id: number) {
    return this.alertService.getAlertById(id);
  }

  @Delete(':id')
  deleteAlertById(@Param('id', ParseIntPipe) id: number) {
    return this.alertService.deleteAlert(id);
  }

  @Patch(':id')
  updateAlertById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlertDto: UpdateAlertDto,
  ) {
    return this.alertService.updateAlert(id, updateAlertDto);
  }
}
