import { useState } from "react";
import { fetchBalanceSheet } from "../utils/fetchBalanceSheet";
import BalanceSheetSummary from "./BalanceSheetSummary";
import { BalanceSheet } from "../types/app";

export default function BizDetailsForm() {
  const [buisnessName, setBuisnessName] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [isFetchingBalanceSheetError, setIsFetchingBalanceSheetError] =
    useState(false);
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet>();
  const [accountingProvider, setAccountingProvider] = useState<string>("Xero");
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const onRequestBalanceSheet = async () => {
    if (!loanAmount || !buisnessName || !accountingProvider) {
      setIsValidationError(true);
    } else {
      try {
        const fetchedBalanceSheet = await fetchBalanceSheet(accountingProvider);
        setBalanceSheet(fetchedBalanceSheet);
      } catch (error) {
        setIsFetchingBalanceSheetError(true);
      }
    }
  };
  const onBuisnessNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuisnessName(event.target.value);
  };

  const onLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(parseInt(event.target.value));
  };

  const onAccountingProviderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAccountingProvider(event.target.value);
  };

  if (!balanceSheet) {
    return (
      <>
        <div className="biz-details-form__wrapper">
          <p>Please enter the buisness details </p>
          <div className="biz-details-form">
            <input
              className="biz-details-form__field-item"
              placeholder="Business name"
              value={buisnessName}
              onChange={onBuisnessNameChange}
            />
            <input
              className="biz-details-form__field-item"
              placeholder="Loan amount"
              type="number"
              value={loanAmount}
              onChange={onLoanAmountChange}
            />
            <select
              className="biz-details-form__field-item"
              name="accounting-provider"
              id="accounting-provider-dropdown"
              onChange={onAccountingProviderChange}
            >
              <option value="Xero">Xero</option>
              <option value="Myob">MYOB</option>
              <option value="Automatica">Automatica</option>
            </select>
            <button
              className="biz-details-form__request-button"
              onClick={onRequestBalanceSheet}
            >
              Request Balance Sheet
            </button>
            <div
              className="biz-details-form__validation-error-text"
              hidden={!isValidationError}
            >
              Please fill all the details
            </div>
            <div
              className="biz-details-form__validation-error-text"
              hidden={!isFetchingBalanceSheetError}
            >
              Error in getting your balance sheet please try again
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <BalanceSheetSummary
          balanceSheet={balanceSheet}
          buisnessName={buisnessName}
          loanAmount={loanAmount}
        />
      </div>
    );
  }
}
