import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to generate a random balance sheet for 12 months
function generateRandomBalanceSheet() {
  const balanceSheet = [];
  const currentYear = new Date().getFullYear();

  for (let month = 1; month <= 12; month++) {
    const profitOrLoss = Math.floor(Math.random() * 100000) - 50000; // Random profit/loss between -50000 to 50000
    const assetsValue = Math.floor(Math.random() * 100000); // Random assets value between 0 to 1,000,000

    balanceSheet.push({
      year: currentYear - 1,
      month,
      profitOrLoss,
      assetsValue,
    });
  }

  return balanceSheet;
}

// Define a route to generate a random balance sheet
app.post('/getBalanceSheet', (req, res) => {
  const randomBalanceSheet = generateRandomBalanceSheet();
  res.json({ ...req.body, balanceSheet: randomBalanceSheet });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
