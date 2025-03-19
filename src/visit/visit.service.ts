import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
  ) {}

  createVisit(visit: CreateVisitDto): Promise<Visit> {
    const newVisit = this.visitRepository.create(visit);
    return this.visitRepository.save(newVisit);
  }

  getVisits(): Promise<Visit[]> {
    return this.visitRepository.find();
  }

  getVisitById(id: number): Promise<Visit | null> {
    return this.visitRepository.findOne({ where: { id } });
  }

  deleteVisit(id: number): Promise<DeleteResult> {
    return this.visitRepository.delete({ id });
  }

  updateVisit(id: number, visit: UpdateVisitDto): Promise<UpdateResult> {
    return this.visitRepository.update({ id }, visit);
  }
}
