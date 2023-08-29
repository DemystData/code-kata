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

  @Get()
  findAll() {
    return this.balanceSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceSheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceSheetDto: UpdateBalanceSheetDto) {
    return this.balanceSheetService.update(+id, updateBalanceSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanceSheetService.remove(+id);
  }
}

