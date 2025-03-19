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
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  createReservation(@Body() CreateReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(CreateReservationDto);
  }

  @Get()
  getReservations() {
    return this.reservationService.getReservations();
  }

  @Get(':id')
  getReservationById(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationById(id);
  }

  @Delete(':id')
  deleteReservationById(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.deleteReservation(id);
  }

  @Patch(':id')
  updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(id, updateReservationDto);
  }
}
