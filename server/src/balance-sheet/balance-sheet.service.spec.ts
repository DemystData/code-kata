import { Test, TestingModule } from '@nestjs/testing';
import { BalanceSheetService } from './balance-sheet.service';

describe('BalanceSheetService', () => {
  let service: BalanceSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceSheetService],
    }).compile();

    service = module.get<BalanceSheetService>(BalanceSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
