import { Module } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { BalanceSheetController } from './balance-sheet.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BalanceSheetController],
  providers: [BalanceSheetService, PrismaService],
})
export class BalanceSheetModule {}
