import { Reservation } from './reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  createReservation(reservation: CreateReservationDto): Promise<Reservation> {
    const newReservation = this.reservationRepository.create(reservation);
    return this.reservationRepository.save(newReservation);
  }

  getReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  getReservationById(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findOne({ where: { id } });
  }

  deleteReservation(id: number): Promise<DeleteResult> {
    return this.reservationRepository.delete({ id });
  }

  updateReservation(
    id: number,
    reservation: UpdateReservationDto,
  ): Promise<UpdateResult> {
    return this.reservationRepository.update({ id }, reservation);
  }
}
