import { Photo } from 'src/photo/photo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  createPhoto(photo: CreatePhotoDto): Promise<Photo> {
    const newPhoto = this.photoRepository.create(photo);
    return this.photoRepository.save(newPhoto);
  }

  getPhotos(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  getPhotoById(id: number): Promise<Photo | null> {
    return this.photoRepository.findOne({ where: { id } });
  }

  deletePhoto(id: number): Promise<DeleteResult> {
    return this.photoRepository.delete({ id });
  }

  updatePhoto(id: number, photo: UpdatePhotoDto): Promise<UpdateResult> {
    return this.photoRepository.update({ id }, photo);
  }
}
