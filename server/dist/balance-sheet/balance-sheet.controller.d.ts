import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';
export declare class BalanceSheetController {
    private readonly balanceSheetService;
    constructor(balanceSheetService: BalanceSheetService);
    create(createBalanceSheetDto: CreateBalanceSheetDto): import(".prisma/client").Prisma.Prisma__balance_sheetClient<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getFromAccountingSoftware(id: number): Promise<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
    }[]>;
    getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto): Promise<number[]>;
}
