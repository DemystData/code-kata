import { Test, TestingModule } from '@nestjs/testing';
import { BalanceSheetController } from './balance-sheet.controller';
import { BalanceSheetService } from './balance-sheet.service';

describe('BalanceSheetController', () => {
  let controller: BalanceSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceSheetController],
      providers: [BalanceSheetService],
    }).compile();

    controller = module.get<BalanceSheetController>(BalanceSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
