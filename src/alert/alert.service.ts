import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  createAlert(alert: CreateAlertDto): Promise<Alert> {
    const newAlert = this.alertRepository.create(alert);
    return this.alertRepository.save(newAlert);
  }

  getAlerts(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  getAlertById(id: number): Promise<Alert | null> {
    return this.alertRepository.findOne({ where: { id } });
  }

  deleteAlert(id: number): Promise<DeleteResult> {
    return this.alertRepository.delete({ id });
  }

  updateAlert(id: number, alert: UpdateAlertDto): Promise<UpdateResult> {
    return this.alertRepository.update({ id }, alert);
  }
}
