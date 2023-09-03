document.addEventListener('DOMContentLoaded', function () {
  const applicationForm = document.getElementById('applicationForm');
  const applicationResult = document.getElementById('applicationResult');
  const submitButton = document.querySelector('button[type="submit"]');

  applicationForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    submitButton.disabled = true; // Disable the submit button while processing
    applicationResult.innerHTML = '<p>Processing...</p>'; // Add a processing message
  
    const businessName = document.getElementById('businessName').value;
    const establishedYear = document.getElementById('establishedYear').value;
    const loanAmount = document.getElementById('loanAmount').value;
    const accountingProvider = document.getElementById('accountingProvider').value;
  
    // Simulated balance sheet data (you can update this with actual data)
    const balanceSheet = [
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
  
    // Prepare data for submission
    const data = {
      businessName,
      establishedYear,
      loanAmount: parseFloat(loanAmount),
      accountingProvider,
      balanceSheet, // Update with actual balance sheet data
    };
  
    try {
      // Simulate sending the application to the backend
      const response = await fetch('http://localhost:3000/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const resultData = await response.json();
        displayResult(resultData);
      } else {
        const errorMessage = await response.text();
        console.error('Error submitting application:', errorMessage);
        displayError(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      displayError('An error occurred while processing the request.');
    } finally {
      submitButton.disabled = false; // Re-enable the submit button
    }
  });

  function displayResult(data) {
    // Display the application result on the page
    applicationResult.innerHTML = `
      <h2>Application Result</h2>
      <p>Business Name: ${data.businessName}</p>
      <p>Year Established: ${data.establishedYear}</p>
      <p>Pre-Assessment: ${data.preAssessment}%</p>
      <p>Decision Result: ${data.decisionResult}</p>
    `;
  }

  function displayError(errorMessage) {
    // Display an error message to the user
    applicationResult.innerHTML = `
      <h2>Error</h2>
      <p>${errorMessage}</p>
    `;
  }
});
