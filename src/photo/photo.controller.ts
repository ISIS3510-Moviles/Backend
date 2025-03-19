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
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Post()
  createPhoto(@Body() CreatePhotoDto: CreatePhotoDto) {
    return this.photoService.createPhoto(CreatePhotoDto);
  }

  @Get()
  getPhotos() {
    return this.photoService.getPhotos();
  }

  @Get(':id')
  getIPhotoById(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.getPhotoById(id);
  }

  @Delete(':id')
  deletePhotoById(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.deletePhoto(id);
  }

  @Patch(':id')
  updatePhotoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photoService.updatePhoto(id, updatePhotoDto);
  }
}
