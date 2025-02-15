import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/createShift.dto';
import { ClockShiftDto } from './dto/clockShift.dto';
import { DeleteShiftDto } from './dto/deleteShift.dto';
import { EditShiftDto } from './dto/editShift.dto';

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('cashier/:id')
  async getAllShiftsByCashierId(@Param('id') id: string) {
    return this.shiftService.getAllShiftsByCashierId({ id });
  }

  @Get(':id')
  async getShiftById(@Param('id') id: string) {
    return this.shiftService.getShiftById({ id });
  }

  @Post()
  async createShift(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.createShift(createShiftDto);
  }

  @Put()
  async editShift(@Body() editShiftDto: EditShiftDto) {
    return this.shiftService.editShift(editShiftDto);
  }

  @Patch('start')
  async clockIn(@Body() clockShiftDto: ClockShiftDto) {
    return this.shiftService.clockIn(clockShiftDto);
  }

  @Patch('end')
  async clockOut(@Body() clockShiftDto: ClockShiftDto) {
    return this.shiftService.clockOut(clockShiftDto);
  }

  @Delete()
  async deleteShift(@Body() deleteShiftDto: DeleteShiftDto) {
    return this.shiftService.deleteShift(deleteShiftDto);
  }
}
