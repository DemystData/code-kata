import { ApiProperty } from '@nestjs/swagger'

export class CreateBalanceSheetDto {

    @ApiProperty()
    company_id: number;

    @ApiProperty()
    year: number

    @ApiProperty()
    month: number

    @ApiProperty()
    profitOrLoss: number

    @ApiProperty()
    assetsValue: number
}
