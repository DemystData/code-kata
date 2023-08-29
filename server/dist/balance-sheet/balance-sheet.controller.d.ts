import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { UpdateBalanceSheetDto } from './dto/update-balance-sheet.dto';
export declare class BalanceSheetController {
    private readonly balanceSheetService;
    constructor(balanceSheetService: BalanceSheetService);
    create(createBalanceSheetDto: CreateBalanceSheetDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBalanceSheetDto: UpdateBalanceSheetDto): string;
    remove(id: string): string;
}
