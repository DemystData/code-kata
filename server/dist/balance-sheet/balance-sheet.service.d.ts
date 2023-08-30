import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';
export declare class BalanceSheetService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBalanceSheetDto: CreateBalanceSheetDto): import(".prisma/client").Prisma.Prisma__balance_sheetClient<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
        key: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getFromAccountingSoftware(id: number): Promise<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
        key: string;
    }[]>;
    getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto): Promise<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
        key: string;
    }[]>;
}
