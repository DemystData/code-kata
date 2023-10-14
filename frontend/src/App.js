import React, { useState } from "react";
import "./style.css";

function App() {
  const [loanAmountRequested, setLoanAmountRequested] = useState(800000);
  const [averageAssetValue, setAverageAssetValue] = useState(1200000);
  const [businessDetails, setBusinessDetails] = useState({
    name: "Sample Business",
    yearEstablished: 2010,
    profitLossSummary: {
      2022: 90000,
      2021: 12000,
    },
    preAssessment: 20,
  });
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [preAssessment, setPreAssessment] = useState(null);
  const [selectedAccountingProvider, setSelectedAccountingProvider] = useState("Xero"); // Default value

  const handleCalculateBalanceSheet = () => {
    // Send a POST request to the backend to calculate the balance sheet
    fetch("http://localhost:5000/api/balance-sheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loanAmountRequested, averageAssetValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBalanceSheet(data);
      });
  };

  const handleSubmitApplication = () => {
    // Send a POST request to the backend to submit the application and calculate preAssessment
    fetch("http://localhost:5000/api/submit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loanAmountRequested, averageAssetValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBusinessDetails(data.businessDetails);
        setPreAssessment(data.preAssessment);
      });
  };

  return (
    <div className="App">
      <h1>Business Details</h1>
      <div className="business-details">
      <p><strong>Name:</strong> {businessDetails.name}</p>
        <p><strong>Year Established:</strong> {businessDetails.yearEstablished}</p>
        <p><strong>Pre-Assessment:</strong> {businessDetails.preAssessment}</p>
      </div>

      <h2>Calculate Balance Sheet</h2>
      <div className="input-fields">
      <label>
        Loan Amount Requested:
        <input
          type="number"
          value={loanAmountRequested}
          onChange={(e) => setLoanAmountRequested(e.target.value)}
        />
      </label>
      </div>
      <br />
      <label>
        Average Asset Value:
        <input
          type="number"
          value={averageAssetValue}
          onChange={(e) => setAverageAssetValue(e.target.value)}
        />
      </label>
      <br />
      <label>
        Accounting Provider:
        <select
          value={selectedAccountingProvider}
          onChange={(e) => setSelectedAccountingProvider(e.target.value)}
        >
          <option value="Xero">Xero</option>
          <option value="MYOB">MYOB</option>
        </select>
      </label>
      <br />
      <button onClick={handleCalculateBalanceSheet}>Request Balance Sheet</button>

      <h2>Submit Application</h2>
      <button onClick={handleSubmitApplication}>Submit Application</button>

      {balanceSheet && (
        <div className="outcome">
        <div>
          <h2>Balance Sheet</h2>
          <p>Assets: {balanceSheet.assets}</p>
          <h3>ProfitLoss</h3>
          {Object.entries(balanceSheet.equity).map(([year, value]) => (
            <p key={year}>
              {year}: {value}
            </p>
          ))}
        </div>
        </div>
      )}

      {preAssessment !== null && (
        
       <div className="outcome">
        <div>
          <h2>Outcome</h2>
          <div className="business-details">
            <p><strong>Name:</strong> {businessDetails.name}</p>
            <p><strong>Year Established:</strong> {businessDetails.yearEstablished}</p>
            <p><strong>Pre-Assessment:</strong> {businessDetails.preAssessment}</p>
          </div>
          <p><strong>Pre-Assessment Value:</strong> <span className={`pre-assessment ${preAssessment >= 60 ? "success-message" : "danger-message"}`}>{preAssessment}%</span></p>
        </div>

        </div>
      )}
    </div>
  );
}

export default App;
