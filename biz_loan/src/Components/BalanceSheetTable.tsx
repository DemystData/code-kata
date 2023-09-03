import React, { MouseEventHandler } from "react";
import { BalanceSheet } from "../types/app";

interface BalanceSheetTableProps {
  balanceSheet: BalanceSheet;
  onToggleViewingBalanceSheet: MouseEventHandler;
}
export default function BalanceSheetTable({
  balanceSheet,
  onToggleViewingBalanceSheet,
}: BalanceSheetTableProps) {
  const years = [...new Set(balanceSheet.map((entry) => entry.year))];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="balance-sheet-table__container">
      <div className="balance-sheet-table__wrapper">
        <button
          className="balance-sheet-table__close-button"
          onClick={onToggleViewingBalanceSheet}
        >
          X
        </button>
        <table className="balance-sheet__table">
          <thead className="balance-sheet-table__header">
            <tr className="balance-sheet-table__header-months">
              <td></td> {/* Leaving this empty since first column has row titles, so we start from next column  */}
              {months.map((month) => {
                return <th key={month}>{month}</th>;
              })}
            </tr>
          </thead>
          <tbody className="balance-sheet-table__body">
            {years.map((year) => {
              const yearEntries = balanceSheet.filter(
                (entry) => entry.year === year
              );
              const { netProfitLoss, sumAssetValues } = yearEntries.reduce(
                (acc, entry) => ({
                  netProfitLoss: acc.netProfitLoss + entry.profit_or_loss,
                  sumAssetValues: acc.sumAssetValues + entry.assets_value,
                }),
                { netProfitLoss: 0, sumAssetValues: 0 }
              );
              const averageAssetValue = sumAssetValues / 12;

              return (
                <React.Fragment key={year}>
                  <tr className="balance-sheet-table__row-year-separator">
                    <td>{year}</td>
                  </tr>
                  <tr>
                    <td className="balance-sheet-table__row-metric-name-cell">
                      Profits
                    </td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                      const monthEntry = yearEntries.find(
                        (entry) => entry.month === month
                      );
                      return (
                        <td key={month}>
                          {monthEntry ? monthEntry.profit_or_loss : ""}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="balance-sheet-table__row-metric-name-cell">
                      Assets
                    </td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                      const monthEntry = yearEntries.find(
                        (entry) => entry.month === month
                      );
                      return (
                        <td key={month}>
                          {monthEntry ? monthEntry.assets_value : ""}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="balance-sheet-table__row-metric-name-cell">
                      Net Profit/Loss
                    </td>
                    <td colSpan={12}>{netProfitLoss}</td>
                  </tr>
                  <tr>
                    <td className="balance-sheet-table__row-metric-name-cell">
                      Average Asset Value
                    </td>
                    <td colSpan={12}>{averageAssetValue}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
