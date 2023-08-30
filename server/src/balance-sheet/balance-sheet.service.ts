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

  getValue(balance_sheet){
    let count=0
    let profitOrLossSummary=0, totalAssetValue=0
    for(const item of balance_sheet){
      profitOrLossSummary+=item.profitOrLoss
      totalAssetValue+=item.assetsValue
      count++
      if(count==12)
        return [profitOrLossSummary, totalAssetValue]
    }
  }

  async getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto){
    let balance_sheet=await this.prisma.balance_sheet.findMany({where: {company_id: getFromDecisionEngineDto.account_provider}, 
      orderBy: [{
        year: 'desc'
      }, {
        month: 'desc'
      }]})
    let result=this.getValue(balance_sheet)
    return result
  }
}
