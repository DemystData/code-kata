document.addEventListener('DOMContentLoaded', () => {
    const loanForm = document.getElementById('loanForm');
    const preAssessmentElement = document.getElementById('preAssessment');
    const balanceSheetList = document.getElementById('balanceSheet');

    loanForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const businessName = document.getElementById('businessName').value;
        const yearEstablished = parseInt(document.getElementById('yearEstablished').value);
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const accountingProvider = document.getElementById('accountingProvider').value;

        const applicationDetails = {
            businessName,
            yearEstablished,
            loanAmount,
            accountingProvider
        };

        // Simulate sending application details to backend
        fetch('/decision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDetails)
        })
        .then(response => response.json())
        .then(data => {
            preAssessmentElement.textContent = data.preAssessment;
        })
        .catch(error => console.error(error));
    });

    const fetchBalanceSheetBtn = document.getElementById('fetchBalanceSheet');
    const selectedAccountingProvider = document.getElementById('accountingProvider');

    fetchBalanceSheetBtn.addEventListener('click', () => {
        const accountingProvider = selectedAccountingProvider.value;

        // Simulate fetching balance sheet from backend
        fetch('/balance-sheet')
            .then(response => response.json())
            .then(data => {
                const relevantBalanceSheet = data.sheet.filter(entry => entry.provider === accountingProvider);
                balanceSheetList.innerHTML = '';

                relevantBalanceSheet.forEach(entry => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Year: ${entry.year}, Month: ${entry.month}, Profit/Loss: ${entry.profitOrLoss}, Assets Value: ${entry.assetsValue}`;
                    balanceSheetList.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
    });
});
