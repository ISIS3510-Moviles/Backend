import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  createBadge(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.createBadge(createBadgeDto);
  }

  @Get()
  getBadges() {
    return this.badgeService.getBadges();
  }

  @Get(':id')
  getBadgeById(@Param('id') id: string) {
    return this.badgeService.getBadgeById(id);
  }

  @Delete(':id')
  deleteBadge(@Param('id') id: string) {
    return this.badgeService.deleteBadge(id);
  }

  @Patch(':id')
  updateBadge(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgeService.updateBadge(id, updateBadgeDto);
  }
}
