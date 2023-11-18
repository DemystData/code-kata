import { Module } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { BalanceSheetController } from './balance-sheet.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BalanceSheetController],
  providers: [PrismaService, BalanceSheetService],
  imports: [PrismaModule]
})
export class BalanceSheetModule {}
