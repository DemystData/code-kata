export interface BalanceSheetDataItem {
    year: number;
    month: number;
    profitOrLoss: number;
    assetsValue: number;
  }

  export interface BalanceSheetData {
    Company: string;
    sheet: BalanceSheetDataItem[];
  }
  