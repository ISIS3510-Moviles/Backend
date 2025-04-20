import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get('full')
  getAlertsFull() {
    return this.alertService.getAlertsFull();
  }

  @Get(':id')
  getAlertById(@Param('id') id: string) { 
    return this.alertService.getAlertById(id);
  }

  @Get('full/:id')
  getAlertByIdFull(@Param('id') id: string) { 
    return this.alertService.getAlertByIdFull(id);
  }

  @Delete(':id')
  deleteAlertById(@Param('id') id: string) {
    return this.alertService.deleteAlert(id);
  }

  @Patch(':id')
  updateAlertById(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ) {
    return this.alertService.updateAlert(id, updateAlertDto);
  }
}
