import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { CreateReportDto } from 'src/report/dto/create-report.dto';
import { UpdateReportDto } from 'src/report/dto/update-report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportService.createReport(createReportDto);
  }

  @Get()
  getReports() {
    return this.reportService.getReports();
  }

  @Get(':id')
  getReportById(@Param('id') id: string) {
    return this.reportService.getReportById(id);
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReport(id);
  }

  @Patch(':id')
  updateReport(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.updateReport(id, updateReportDto);
  }
}
