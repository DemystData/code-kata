type Config = {
  loanTable: string;
};

export const config: Config = {
  loanTable: String(process.env.LOAN_TABLE),
};
