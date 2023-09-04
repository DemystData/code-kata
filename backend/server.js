const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000; // port

app.use(bodyParser.json());
app.use(
    cors({
      origin: "http://localhost:3000", // frontend's URL
    })
  );

// Sample business details
const businessDetails = {
  name: "Sample Business",
  yearEstablished: 2010,
  profitLossSummary: {
    2022: 90,
    2021: 120,
  },
  preAssessment: 20,
};

// Calculate balance sheet function
function calculateBalanceSheet(profitLossSummary, averageAssetValue, loanAmountRequested) {
  const balanceSheet = {
    assets: averageAssetValue,
    equity: {},
  };

  // Calculate equity for each year based on profit/loss
  for (const year in profitLossSummary) {
    const profitLoss = profitLossSummary[year];
    balanceSheet.equity[year] = averageAssetValue - loanAmountRequested + profitLoss;
  }

  return balanceSheet;
}

// Route to generate and send the balance sheet
app.post("/api/balance-sheet", (req, res) => {
  // Get loan amount requested and average asset value from the request body
  const { loanAmountRequested, averageAssetValue } = req.body;

  // Calculate the balance sheet based on available data
  const balanceSheet = calculateBalanceSheet(
    businessDetails.profitLossSummary,
    averageAssetValue,
    loanAmountRequested
  );

  res.json(balanceSheet);
});

// Route to submit the application and calculate preAssessment
app.post("/api/submit-application", (req, res) => {

const lastYearProfit = businessDetails.profitLossSummary[2022]; // Assuming current year is 2023
const { loanAmountRequested, averageAssetValue } = req.body;

// Initialize the pre-assessment score
let preAssessment = 0;

// Check last year's profit
if (lastYearProfit > 100) {
  preAssessment += 30; // Add 30 to the pre-assessment score if profit is favorable
} else {
  preAssessment += 10; // Add 10 to the pre-assessment score if profit is not favorable
}

// Check if average asset value is greater than the loan amount
if (averageAssetValue > loanAmountRequested) {
  preAssessment += 60; // Add 60 to the pre-assessment score if asset value is high
} else {
  preAssessment += 20; // Add 20 to the pre-assessment score if asset value is not high
}

// Now, you have the preAssessment value, which is the sum of the scores based on profit and asset value.
businessDetails.preAssessment = preAssessment;


  res.json({
    businessDetails,
    preAssessment: businessDetails.preAssessment,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
