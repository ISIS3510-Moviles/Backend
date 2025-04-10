import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get()
  getReservations() {
    return this.reservationService.getReservations();
  }

  @Get('by-user/:userId')
  getReservationsByUserId(@Param('userId') userId: string) {
    return this.reservationService.getReservationsByUserId(userId);
  }

  @Get(':id')
  getReservationById(@Param('id') id: string) {
    return this.reservationService.getReservationById(id);
  }

  @Delete(':id')
  deleteReservationById(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }

  @Delete('all')
  deleteReservations() {
    return this.reservationService.deleteAllReservations();
  }

  @Patch(':id')
  updateReservationById(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(id, updateReservationDto);
  }
}
