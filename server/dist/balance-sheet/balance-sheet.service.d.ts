import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';
import { UpdateBalanceSheetDto } from './dto/update-balance-sheet.dto';
export declare class BalanceSheetService {
    create(createBalanceSheetDto: CreateBalanceSheetDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBalanceSheetDto: UpdateBalanceSheetDto): string;
    remove(id: number): string;
}
