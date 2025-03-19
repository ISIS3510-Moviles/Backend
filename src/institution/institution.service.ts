import { Institution } from 'src/institution/institution.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {}

  createInstitution(institution: CreateInstitutionDto): Promise<Institution> {
    const newInstitution = this.institutionRepository.create(institution);
    return this.institutionRepository.save(newInstitution);
  }

  getInstitutions(): Promise<Institution[]> {
    return this.institutionRepository.find();
  }

  getInstitutionById(id: number): Promise<Institution | null> {
    return this.institutionRepository.findOne({ where: { id } });
  }

  deleteInstitution(id: number): Promise<DeleteResult> {
    return this.institutionRepository.delete({ id });
  }

  updateInstitution(
    id: number,
    institution: UpdateInstitutionDto,
  ): Promise<UpdateResult> {
    return this.institutionRepository.update({ id }, institution);
  }
}
