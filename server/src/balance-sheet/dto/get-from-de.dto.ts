import { ApiProperty } from '@nestjs/swagger'

export class GetFromDecisionEngineDto {
    
    @ApiProperty()
    business_name: string;

    @ApiProperty()
    year: number

    @ApiProperty()
    profitOrLossSummary: number

    @ApiProperty()
    preAssessmentValue: number

    @ApiProperty()
    account_provider: number
}
