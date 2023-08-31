import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';

@ApiTags('Balance Sheet')
@Controller('balance-sheet')
export class BalanceSheetController {
  constructor(private readonly balanceSheetService: BalanceSheetService) {}

  @Post()
  create(@Body() createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.balanceSheetService.create(createBalanceSheetDto);
  }

  //to get the balance sheet of the company
  @Get('accounting-software/:id')
  getFromAccountingSoftware(@Param('id') id: number) {
    return this.balanceSheetService.getFromAccountingSoftware(+id);
  }

  //to get the final result from decision engine
  @Post('decision-engine')
  getFromDecisionEngine(@Body() getFromDecisionEngineDto: GetFromDecisionEngineDto){
    return this.balanceSheetService.getFromDecisionEngine(getFromDecisionEngineDto)
  }
}

