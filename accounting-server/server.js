import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

function generateRandomBalanceSheet(body) {
  const balanceSheet = [];
  const currentYear = new Date().getFullYear();
  const { yearEstablished } = body;

  for (let year = currentYear - 1; year >= parseInt(yearEstablished); year--) {
    for (let month = 1; month <= 12; month++) {
      const profitOrLoss = Math.floor(Math.random() * 10000) - 5000;
      const assetsValue = Math.floor(Math.random() * 1000000);
      balanceSheet.push({
        year,
        month,
        profitOrLoss,
        assetsValue,
      });
    }
  }
  return balanceSheet;
}

app.post('/getBalanceSheet', (req, res) => {
  const randomBalanceSheet = generateRandomBalanceSheet(req.body);
  res.json({ ...req.body, balanceSheet: randomBalanceSheet });
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
