import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';

@Injectable()
export class BalanceSheetService {

  constructor(private readonly prisma: PrismaService) {}

  create(createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.prisma.balance_sheet.create({data: createBalanceSheetDto})
  }

  //to get the balance sheet in descending order of year and month
  async getFromAccountingSoftware(id: number) {
    return await this.prisma.balance_sheet.findMany({where: {company_id: id},
      orderBy: [{
        year: 'desc'
      },
      {
        month: 'desc'
      }]});
  }

  //to get the overall profit/loss summary and total asset value
  getValue(balance_sheet){
    let count=0
    let profitOrLossSummary=0, totalAssetValue=0
    for(const item of balance_sheet){
      profitOrLossSummary+=item.profitOrLoss
      totalAssetValue+=item.assetsValue
      count++
      //to check only for 12 months
      if(count==12)
        break
    }
    return [profitOrLossSummary, totalAssetValue]
  }

  //to determine the amount approved
  decisionEngine(preAssessment, loan_amount){
    return [preAssessment, ((preAssessment/100)*loan_amount)]
  }

  async getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto){
    //get the balance sheet in descending order of year and month
    let balance_sheet=await this.prisma.balance_sheet.findMany({where: {company_id: getFromDecisionEngineDto.account_provider}, 
      orderBy: [{
        year: 'desc'
      }, {
        month: 'desc'
      }]})

    //get the overall profit/loss and total asset value
    let result=this.getValue(balance_sheet)
    // console.log(result)
    let preAssessment=20  //default value

    //if profit then 60% of loan is approved
    if(result[0]>0)
      preAssessment=60

    //if total asset value > loan amount then 100% loan apprived
    if(result[1]>getFromDecisionEngineDto.loan_amount)
      preAssessment=100
    return this.decisionEngine(preAssessment, getFromDecisionEngineDto.loan_amount)
  }
}
