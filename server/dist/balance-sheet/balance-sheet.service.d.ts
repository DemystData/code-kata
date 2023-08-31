import { PrismaService } from '../prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { GetFromDecisionEngineDto } from './dto/get-from-de.dto';
export declare class BalanceSheetService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getValue(balance_sheet: any): number[];
    decisionEngine(preAssessment: any, loan_amount: any): any[];
    getFromDecisionEngine(getFromDecisionEngineDto: GetFromDecisionEngineDto): Promise<any[]>;
}
