import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './LoadingScreen';

function App() {
  const [initiated, setInitiated] = useState(false);
  const [initialheading, setinitialheading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false); // State to control message visibility
  const [businessName, setBusinessName] = useState('');
  const [balanceSheetfetched,setbalanceSheetfetched] = useState(false);
  const [yearEstablished, setYearEstablished] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [decisionResult, setDecisionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [accountingProvider, setAccountingProvider] = useState('Xero');
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [preAssessment, setPreAssessment] = useState(20);

  useEffect(() => {
    calculatePreAssessment();
  }, [loanAmount, balanceSheet]);

  // initiating the application based on the response from the backend
  const handleInitiate = async() => {
    
    try {
      const response = await fetch('http://127.0.0.1:5003/api/initiate-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // You can include any data you need to send in the body if required
      });
  
      if (response.status === 200) {
        // Application initiation was successful
        // You can update your state or show a message to the user
        console.log('Application initiated successfully');
        setLoading(true);
      } else {
        // Handle errors if the initiation failed
        console.error('Application initiation failed');
      }
    } catch (error) {
      console.error('Error initiating application:', error);
    }
    // Simulate initiation process
    setTimeout(() => {
      setInitiated(true);
      setLoading(false);
      
      // Show the message of "Initiation complete. Opening Loan App..." for 1 second
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
        setinitialheading(false);
      }, 1000); 
    }, 0); 
  };

  // Fetch the Balance Sheet 
  const fetchBalanceSheet = async (company, accountingProvider) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5003/api/balance-sheet?company=${company}&accountingProvider=${accountingProvider}`
      );
      
      if (response.status === 200) {
        const data = await response.json();
        setBalanceSheet(data.balanceSheet);
        setbalanceSheetfetched(true);
        // Clear any previous error message
        setErrorMessage(null);
      } else if (response.status === 404) {
        // Handle business not found error
        const errorData = await response.json();
        console.error('Business not found error:', errorData.error);
  
        // Set the error message state
        setErrorMessage(errorData.error);
  
        // Clear the balance sheet and any previous error message
        setBalanceSheet([]);
      } else {
        // Handle other error cases
        console.error('Error fetching balance sheet:', response.statusText);
        // Set the error message state
        setErrorMessage(`Error: ${response.statusText}`);
        // Clear the balance sheet
        setBalanceSheet([]);
      }
    } catch (error) {
      console.error('Error fetching balance sheet:', error);
      // Set the error message state
      setErrorMessage(`Error: ${error.message}`);
      // Clear the balance sheet
      setBalanceSheet([]);
    }
  };
  

  // Function to calculate preAssessment based on rules
  const calculatePreAssessment = () => {
    const PROFIT_THRESHOLD = 0;
    const profitableMonths = balanceSheet.filter(entry => {
      if (entry.profitOrLoss > PROFIT_THRESHOLD) {
        console.log("Profitable Entry:", entry.profitOrLoss);
        return true; // Keep this entry in the resulting array
      } else {
        return false; // Exclude this entry from the resulting array
      }
    });
    const averageAssets = balanceSheet.reduce((total, entry) => total + entry.assetsValue, 0) / balanceSheet.length;
    console.log("part1",balanceSheet.reduce((total, entry) => total + entry.assetsValue, 0))
    if (profitableMonths.length >= 12) {
      setPreAssessment(60);
    } else if (averageAssets > parseFloat(loanAmount)) {
      setPreAssessment(100);
    } else {
      setPreAssessment(20);
    }
  };  

  // Function to handle form submission
  const handleSubmit = async () => {
    calculatePreAssessment();
    try {
      const response = await fetch('http://127.0.0.1:5003/api/decision-engine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preAssessment }) // Assuming preAssessment value is already calculated
      });
      const decisionData = await response.json();
      setDecisionResult(decisionData); // Update decisionResult state with the outcome
    } catch (error) {
      console.error('Error fetching decision outcome:', error);
    }
  };

  return (
    <div className="App">
      {initialheading && (
                <h1>Loan Application Initiation</h1>
              )}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {!initiated ? (
            <button onClick={handleInitiate}>Initiate Application</button>
          ) : (
            <div>
              {isMessageVisible && (
                <p>Initiation complete. Opening Loan App...</p>
              )}
              <h1>Business Loan Application</h1>
      {/* Input fields */}
      <div className='container'>
      <div>
        <label>Business Name:</label>
        <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} />
      </div>
      <div>
        <label>Year Established:</label>
        <input type="text" value={yearEstablished} onChange={e => setYearEstablished(e.target.value)} />
      </div>
      <div>
        <label>Loan Amount:</label>
        <input type="text" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
      </div>
      <div>
        <label>Accounting Provider:</label>
        <select value={accountingProvider} onChange={e => setAccountingProvider(e.target.value)}>
          <option value="Xero">Xero</option>
          <option value="MYOB">MYOB</option>
        </select>
      </div>
      </div>
      {/* Fetch balance sheet button */}
      <button onClick={() => fetchBalanceSheet(businessName,accountingProvider)}>Request Balance Sheet</button>
      {/* Display fetched balance sheet */}
      <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        {balanceSheetfetched && (<h2>Balance Sheet</h2>)}
        <table id="data-table">
            {balanceSheetfetched && (<thead>
                <th>Year</th>
                <th>Month</th>
                <th>Profit/Loss</th>
                <th>Assets Value</th>
            </thead>)}
            <tbody id="data-table-body">
          {balanceSheet.map((entry, index) => (
                <tr id="data-row-template" key={index}>
                    <td>{entry.year}</td>
                    <td>{entry.month}</td>
                    <td>{entry.profitOrLoss}</td>
                    <td>{entry.assetsValue}</td>
                </tr>
                ))}
                 </tbody>
            </table>
      </div>
      {/* Submit application button */}
      {balanceSheetfetched && (<button onClick={handleSubmit}>Submit Application</button>)}
      {/* Display application result */}
      
      {/* Display decision engine result */}
  {decisionResult && (
    <div>
      <h1>Decision Engine Result:</h1>
      <div className="decision">
    <div className='business-details'>
        <table>
          <th>Business Details</th>
          <tr>
          <p>Name: {businessName}</p>
          <p>Year Established: {yearEstablished}</p>
          </tr>
        </table>
    </div>
    <div className='profitLoss'>
        <table>
          <th>Summary of Profit/Loss by the Year</th>
          <th>preAssessment value</th>
          <tr>
           <td>{balanceSheet.map(entry => entry.profitOrLoss).join(', ')}</td>
           <td>{preAssessment}</td>
          </tr>
        </table>
    </div>
      </div>
      <div className="result">
  <p>
    Loan Approval:{" "}
    <b style={{ color: decisionResult.approval === "Rejected" ? "red" : "green" }}>
      {decisionResult.approval}
    </b>
  </p>
  <p>
    Reason:{" "}
    <b style={{ color: decisionResult.approval === "Rejected" ? "red" : "green" }}>
      {decisionResult.reason}
    </b>
  </p>
</div>
    </div>
  )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
