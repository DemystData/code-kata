import { Module } from '@nestjs/common';
import { BalanceSheetModule } from './balance-sheet/balance-sheet.module';

@Module({
  imports: [BalanceSheetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
