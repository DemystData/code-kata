const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;

app.use(cors());

app.post('/submit-application', (req, res) => {
    // Get loan application data from the request
    const data = req.body;

    // Add a console.log statement to log the received data
    // console.log('Received Request Data:', data);
  
    if (!data || !data.balanceSheet) {
      // Handle the case where balanceSheet is missing or undefined
      // console.error('Invalid request data:', data); 
      res.status(400).json('Please provide a valid loan application with a BalanceSheet.');
      return;
    }
  
    // Calculate pre-assessment based on rules and balance sheet
    const preAssessment = calculatePreAssessment(data);
  
    // Simulate sending the application to the decision engine
    const decisionResult = simulateDecisionEngine(data);
  
    // Prepare the response
    const response = {
      businessName: data.businessName,
      establishedYear: data.establishedYear,
      preAssessment,
      decisionResult,
    };
  
    res.json(response);
});
  

function calculatePreAssessment(data) {
  // Get the balance sheet data from the loan application
  const balanceSheet = data.balanceSheet;

  // Check if the business has made a profit in the last 12 months
  const hasProfit = balanceSheet
    .slice(0, 12) // Consider the last 12 months
    .some((entry) => entry.profitOrLoss > 0);

  // Calculate the average asset value across the last 12 months
  const avgAssetValue =
    balanceSheet
      .slice(0, 12) // Consider the last 12 months
      .reduce((sum, entry) => sum + entry.assetsValue, 0) / 12;

  // Apply the rules to calculate the pre-assessment value
  let preAssessment = 20; // Default value

  if (hasProfit) {
    preAssessment = 60;
  } else if (avgAssetValue > data.loanAmount) {
    preAssessment = 100;
  }

  return preAssessment;
}

function simulateDecisionEngine(data) {
  // Simulate the decision engine response
  // In a real scenario, this would involve sending data to an external service
  // and receiving a response
  return 'Approved'; // Simulated decision result
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
