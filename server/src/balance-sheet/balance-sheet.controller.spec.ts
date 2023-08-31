import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { BalanceSheetController } from './balance-sheet.controller';
import { BalanceSheetService } from './balance-sheet.service';

describe('BalanceSheetController', () => {
  let controller: BalanceSheetController;
  let service: BalanceSheetService

  beforeEach(async () => {

    const mockService = {
      getFromAccountingSoftware: jest.fn(), 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceSheetController],
      providers: [BalanceSheetService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<BalanceSheetController>(BalanceSheetController);
    service = module.get<BalanceSheetService>(BalanceSheetService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFromAccountingSoftware', () => {
    it('should call the service method with the provided id', async () => {
      const id = 3; 
      const balance_sheet=[{
        "id": 1,
        "company_id": 3,
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
      }]
      jest.spyOn(service, 'getFromAccountingSoftware').mockResolvedValue(balance_sheet)
      const result=await controller.getFromAccountingSoftware(id)
      expect(result).toEqual(balance_sheet)
      expect(service.getFromAccountingSoftware).toHaveBeenCalledWith(id)
    });
  });

  it('should call the service method with the provided DTO', async () => {
    const dto = {
      "business_name": "ABC",
      "year": 2022,
      "loan_amount": 100000,
      "account_provider": 1
    };

    const result = [100, 100000] 

    jest.spyOn(service, 'getFromDecisionEngine').mockResolvedValue(result);

    const response = await controller.getFromDecisionEngine(dto);

    expect(response).toBe(result);
    expect(service.getFromDecisionEngine).toHaveBeenCalledWith(dto);
  });
});
