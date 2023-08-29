import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { UpdateBalanceSheetDto } from './dto/update-balance-sheet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Balance Sheet')
@Controller('balance-sheet')
export class BalanceSheetController {
  constructor(private readonly balanceSheetService: BalanceSheetService) {}

  @Post()
  create(@Body() createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.balanceSheetService.create(createBalanceSheetDto);
  }

  @Get(':id')
  getFromAccountingSoftware(@Param('id') id: number) {
    return this.balanceSheetService.getFromAccountingSoftware(+id);
  }
}

