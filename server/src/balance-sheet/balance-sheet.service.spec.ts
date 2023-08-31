import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BalanceSheetService } from './balance-sheet.service';

describe('BalanceSheetService', () => {
  let service: BalanceSheetService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceSheetService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<BalanceSheetService>(BalanceSheetService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFromAccountingSoftware', () => {
    it('should return balance sheet records from Prisma', async () => {
      const companyId = 1;
      const balanceSheetRecords = [
        {
          "id": 1,
          "company_id": 3,
          "year": 2020,
          "month": 12,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        }
      ];

      jest.spyOn(prismaService.balance_sheet, 'findMany').mockResolvedValue(balanceSheetRecords);
      const result = await service.getFromAccountingSoftware(companyId);

      expect(result).toBe(balanceSheetRecords);
      expect(prismaService.balance_sheet.findMany).toHaveBeenCalledWith({
        where: { company_id: companyId },
        orderBy: [
          {
            year: 'desc',
          },
          {
            month: 'desc',
          },
        ],
      });
    });
  });

  describe('getValue', () => {
    it('should get the values correctly', () => {
      const balanceSheet = [
        {
          "id": 1,
          "company_id": 3,
          "year": 2020,
          "month": 12,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        }
      ];

      const expectedResult = [250000, 1234];
      const result = service.getValue(balanceSheet);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('decisionEngine', () => {
    it('should calculate values correctly', () => {
      const preAssessment = 8000; 
      const loanAmount = 10000; 
  
      const expectedResults = [preAssessment, (preAssessment / 100) * loanAmount];
      const result = service.decisionEngine(preAssessment, loanAmount);
      expect(result).toEqual(expectedResults);
    });
  });

  describe('getFromDecisionEngine', () => {
    it('should calculate decision engine result correctly', async () => {
      const getFromDecisionEngineDto = {
        business_name: 'ABC',
        year: 2022,
        account_provider: 3,
        loan_amount: 10000,
      };

      const findManyMock = jest.spyOn(prismaService.balance_sheet, 'findMany');
      findManyMock.mockResolvedValue([
        {
          id: 1,
          company_id: 3,
          year: 2020,
          month: 12,
          profitOrLoss: 250000,
          assetsValue: 1234,
        },
      ]);

      const getValueMock = jest.spyOn(service, 'getValue');
      getValueMock.mockReturnValue([250000, 1234]);

      const result = await service.getFromDecisionEngine(getFromDecisionEngineDto);

      expect(result).toEqual([60, 6000]);
      expect(findManyMock).toHaveBeenCalledWith({
        where: { company_id: getFromDecisionEngineDto.account_provider },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
      });
      expect(service.getValue).toHaveBeenCalledWith([
        {
          id: 1,
          company_id: 3,
          year: 2020,
          month: 12,
          profitOrLoss: 250000,
          assetsValue: 1234,
        },
      ]);
    });
  });

});
