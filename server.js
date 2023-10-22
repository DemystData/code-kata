const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // Use extended for form data

// Serve static files from the current directory
app.use(express.static(__dirname));

// Simulated balance sheet data and calculatePreAssessment function
// ...


// Simulated balance sheet data for calculations
const sheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Simulated decision engine endpoint
app.post('/decision', (req, res) => {
    const applicationDetails = req.body;
    const preAssessment = calculatePreAssessment(applicationDetails);
    
    // Simulate decision engine's response
    res.json({ preAssessment });
});

// Simulated accounting software endpoint
app.get('/balance-sheet', (req, res) => {
    console.log('Received a request for balance sheet');
    // Simulate fetching balance sheet data from accounting software
    res.json({ sheet });
});

function calculatePreAssessment(applicationDetails) {
    // Calculate total profit/loss and total asset value
    const totalProfitOrLoss = sheet.reduce((total, entry) => total + entry.profitOrLoss, 0);
    const totalAssetValue = sheet.reduce((total, entry) => total + entry.assetsValue, 0);

    // Calculate average asset value
    const averageAssetValue = totalAssetValue / sheet.length;

    // Apply rules and calculate preAssessment
    if (totalProfitOrLoss > 0) {
        return 60; // Rule 1: Profit in the last 12 months
    } else if (averageAssetValue > applicationDetails.loanAmount) {
        return 100; // Rule 2: Average asset value > loan amount
    } else {
        return 20; // Default value
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
