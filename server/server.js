// Import required modules
const express = require('express');
const cors = require('cors');
const app = express();
const pgp = require('pg-promise')();
const dbConfig = {
  // Your database configuration options here
  // For example:
  host: 'localhost',
  port: 5432,
  database: 'your_database_name',
  user: 'your_username',
  password: 'your_password',
};
const db = pgp(dbConfig);

// Create the database table (assuming it doesn't exist yet)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS balance_sheets (
    id SERIAL PRIMARY KEY,
    business_name TEXT NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    profit_or_loss NUMERIC NOT NULL,
    assets_value NUMERIC NOT NULL
  )
`;

db.none(createTableQuery)
  .then(() => {
    console.log('Table "balance_sheets" created successfully');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });


// Configure CORS settings
const corsOptions = {
  origin: '*', // Allow requests from any origin (update this to a specific origin in production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and credentials to be sent
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint to add a balance sheet entry
app.post('/add-balance-sheet', async (req, res, next) => {
  try {
    const { businessName, year, month, profitOrLoss, assetsValue } = req.body;

    // Validate request data
    if (!businessName || !year || !month || profitOrLoss === undefined || assetsValue === undefined) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const query = `
      INSERT INTO balance_sheets (business_name, year, month, profit_or_loss, assets_value)
      VALUES ($1, $2, $3, $4, $5)
    `;

    // Insert the balance sheet data into the database
    await db.none(query, [businessName, year, month, profitOrLoss, assetsValue]);
    res.status(201).json({ message: 'Balance sheet added to the database' });
  } catch (error) {
    next(error);
  }
});

// Endpoint to retrieve balance sheet data for the last 12 months
app.get('/get-balance-sheet', async (req, res, next) => {
  try {
    const { businessName } = req.query;

    // Validate request data
    if (!businessName) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const query = `
      SELECT business_name, year, month, profit_or_loss, assets_value    
      FROM (
          SELECT DISTINCT ON (year, month)
          business_name, year, month, profit_or_loss, assets_value
          FROM balance_sheets
          WHERE business_name = $1
          ORDER BY year DESC, month DESC
          LIMIT 12
      ) subquery
      ORDER BY year ASC, month ASC
    `;

    // Fetch the balance sheet data from the database
    const sheetData = await db.any(query, [businessName]);

    if (sheetData.length === 0) {
      return res.status(404).json({ error: 'Balance sheet data not found' });
    }

    res.json(sheetData);
  } catch (error) {
    next(error);
  }
});

// Function to simulate a decision engine based on balance sheet data
function simulateDecisionEngine(sheet, loanAmount) {
  const totalProfitOrLoss = sheet.reduce((total, entry) => total + parseInt(entry.profit_or_loss), 0);
  const totalAssetValue = sheet.reduce((total, entry) => total + parseFloat(entry.assets_value), 0);
  const averageAssetValue = totalAssetValue / sheet.length;

  if (averageAssetValue > loanAmount) {
    return { preAssessment: 100 };
  } else if (totalProfitOrLoss > 0) {
    return { preAssessment: 60 };
  } else {
    return { preAssessment: 20 };
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Endpoint to perform a pre-assessment based on balance sheet data
app.post('/decision', async (req, res, next) => {
  try {
    const { name, loanAmount } = req.body;

    // Validate request data
    if (!name || !loanAmount) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    let sheetData;

    // Retrieve balance sheets from the database for the last 12 months
    const query = `
        SELECT year, month, profit_or_loss, assets_value    
        FROM (
            SELECT DISTINCT ON (year, month)
            year, month, profit_or_loss, assets_value
            FROM balance_sheets
            WHERE business_name = $1
            ORDER BY year DESC, month DESC
            LIMIT 12
        ) subquery
        ORDER BY year ASC, month ASC
    `;

    sheetData = await db.any(query, [name]);

    if (sheetData.length !== 12) {
      return res.status(400).json({ error: 'Insufficient data for the last 12 months' });
    }

    const preAssessmentData = simulateDecisionEngine(sheetData, loanAmount);
    const data = {
      businessDetails: {
        name,
        loanAmount
      },
      summaryOfProfitOrLoss: sheetData.slice(0, 12), // Last 12 months data
      ...preAssessmentData,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
