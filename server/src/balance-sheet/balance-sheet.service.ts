import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { UpdateBalanceSheetDto } from './dto/update-balance-sheet.dto';

@Injectable()
export class BalanceSheetService {

  constructor(private prisma: PrismaService) {}

  create(createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.prisma.balance_sheet.create({data: createBalanceSheetDto})
  }

  findAll() {
    return `This action returns all balanceSheet`;
  }

  getFromAccountingSoftware(id: number) {
    return this.prisma.balance_sheet.findMany({where: {company_id: id}});
  }
}
