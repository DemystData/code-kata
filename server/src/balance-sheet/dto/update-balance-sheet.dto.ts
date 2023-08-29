import { PartialType } from '@nestjs/swagger';
import { CreateBalanceSheetDto } from './create-balance-sheet.dto';

export class UpdateBalanceSheetDto extends PartialType(CreateBalanceSheetDto) {}
