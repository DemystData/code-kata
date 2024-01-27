type Loan = {
  status: "Approved";
  amount: number;
  approvedPercentage?: number;
};

type Assets = {
  year: number;
  month: string;
  profitOrLoss: number;
  assetValue: number;
};

export type LoanApplication = {
  id: string;
  companyName: string;
  accountingProvider: string;
  assets: Assets[];
  loan?: Loan[];
};
