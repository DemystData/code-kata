import { BalanceSheet } from "../types/app";

export const getPreAssessment = (balanceSheet: BalanceSheet) => {
  // Sorting balance sheet data as per recent months and year
  balanceSheet.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Sort by year in descending order
    }
    return b.month - a.month; // Sort by month in descending order within the same year
  });

  // Using sorted data to get last year's net profit  losses and average asset value
  const { sumAssetValues, netProfitLoss } = balanceSheet.slice(0, 12).reduce(
    (acc, entry) => ({
      sumAssetValues: acc.sumAssetValues + entry.assets_value,
      netProfitLoss: acc.netProfitLoss + entry.profit_or_loss,
    }),
    { sumAssetValues: 0, netProfitLoss: 0 }
  );

  const averageAssetValue = sumAssetValues / 12;

  return {
    netProfitLossLastYear: netProfitLoss,
    averageAssetValueLastYear: averageAssetValue,
  };
};
