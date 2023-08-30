import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';

@Injectable()
export class BalanceSheetService {

  constructor(private prisma: PrismaService) {}

  create(createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.prisma.balance_sheet.create({data: createBalanceSheetDto})
  }

  async getFromAccountingSoftware(id: number) {
    return await this.prisma.balance_sheet.findMany({where: {company_id: id}});
  }

  async getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto){
    let balance_sheet=await this.prisma.balance_sheet.findMany({where: {company_id: getFromDecisionEngineDto.account_provider}, 
      orderBy: [{
        year: 'desc'
      }, {
        month: 'desc'
      }]})
    
    return balance_sheet
  }
}
