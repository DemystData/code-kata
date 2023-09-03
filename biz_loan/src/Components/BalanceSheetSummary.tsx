import { useState } from "react";
import BalanceSheetTable from "./BalanceSheetTable";
import { BalanceSheet } from "../types/app";
import { fetchOutcome } from "../utils/fetchOutcome";
import { getPreAssessment } from "../utils/getPreAssessment";
import Modal from "./OutcomeModal";

interface BalanceSheetSummaryProps {
  balanceSheet: BalanceSheet;
  buisnessName: string;
  loanAmount: number;
}

export default function BalanceSheetSummary({
  balanceSheet,
  buisnessName,
  loanAmount,
}: BalanceSheetSummaryProps) {
  const [isBalanceSheetShowing, setIsBalanceSheetShowing] = useState(false);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [preApprovedValue, setPreApprovedValue] = useState<number>(0);

  const uniqueYears = [...new Set(balanceSheet.map((entry) => entry.year))];

  const onToggleViewingBalanceSheet = () => {
    setIsBalanceSheetShowing((isBalanceSheetShowing) => !isBalanceSheetShowing);
  };

  const onSubmitBalanceSheetDetails = async () => {
    const { netProfitLossLastYear, averageAssetValueLastYear } =
      getPreAssessment(balanceSheet);

    const getAssessmentValue = await fetchOutcome({
      buisnessName,
      loanAmount,
      netProfitLossLastYear,
      averageAssetValueLastYear,
    });

    setPreApprovedValue(getAssessmentValue);
    openOutcomeModal();
  };

  const closeOutcomeModal = () => {
    setIsOutcomeModalOpen(false);
  };
  const openOutcomeModal = () => {
    setIsOutcomeModalOpen(true);
  };

  return (
    <>
    { isOutcomeModalOpen && <Modal onClose={closeOutcomeModal} value={preApprovedValue} /> }
      <div className="balance-sheet-summary__container"> 
        <h1>{buisnessName}</h1>
        <h2>Balance Sheet Summary</h2>
        {uniqueYears.map((year) => {
          const yearEntries = balanceSheet.filter(
            (entry) => entry.year === year
          );

          const { netProfitLoss, totalAssetValues } = yearEntries.reduce(
            (acc, entry) => ({
              netProfitLoss: acc.netProfitLoss + entry.profit_or_loss,
              totalAssetValues: acc.totalAssetValues + entry.assets_value,
            }),
            { netProfitLoss: 0, totalAssetValues: 0 }
          );
          
          const averageAssetValue = totalAssetValues / yearEntries.length;

          return (
            <div key={year} className="balance-sheet-summary__per-year">
              <h3>Year: {year}</h3>
              <p>Net Profit/Loss: {netProfitLoss}</p>
              <p>Average Asset Value: {averageAssetValue}</p>
            </div>
          );
        })}
        <div className="balance-sheet-summary__wrapper">
          <div className="balance-sheet-summary__buttons-bar"></div>
          <button
            className="balance-sheet-summary__button"
            onClick={onToggleViewingBalanceSheet}
          >
            View Balance Sheet
          </button>
          <button
            className="balance-sheet-summary__button"
            onClick={onSubmitBalanceSheetDetails}
          >
            Submit Balance Sheet Details
          </button>
          <div className="balance-sheet-summary__table">
            {isBalanceSheetShowing && (
              <BalanceSheetTable
                balanceSheet={balanceSheet}
                onToggleViewingBalanceSheet={onToggleViewingBalanceSheet}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
