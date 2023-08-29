import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
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
    getFromAccountingSoftware(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
    }[]>;
}
