import { Injectable } from '@nestjs/common';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { UpdateBalanceSheetDto } from './dto/update-balance-sheet.dto';

@Injectable()
export class BalanceSheetService {
  create(createBalanceSheetDto: CreateBalanceSheetDto) {
    return 'This action adds a new balanceSheet';
  }

  findAll() {
    return `This action returns all balanceSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balanceSheet`;
  }

  update(id: number, updateBalanceSheetDto: UpdateBalanceSheetDto) {
    return `This action updates a #${id} balanceSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} balanceSheet`;
  }
}
