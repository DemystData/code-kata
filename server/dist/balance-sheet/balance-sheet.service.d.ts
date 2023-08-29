import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): string;
    getFromAccountingSoftware(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        company_id: number;
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
    }[]>;
}
