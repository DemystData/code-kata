export type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type YearType = 2018 | 2019 | 2020 | 2021 | 2022 | 2023;

export type BalanceSheet = MonthlyReport[];

export interface MonthlyReport {
    year: YearType,
    month: MonthType,
    profit_or_loss: number,
    assets_value: number,
}