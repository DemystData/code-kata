from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your app

balance_sheet_data = {
    "Xero": [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": -250000000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": -250000000,
            "assetsValue": 1234
        },
    ],
    "MYOB": [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 300000,
            "assetsValue": 1500
        },
    ],
}

@app.route('/api/asp/balance-sheet', methods=['GET'])
def get_asp_balance_sheet():
    accounting_provider = request.args.get('accountingProvider')
    year = request.args.get('year')
    print(year)
    print(accounting_provider)
    if accounting_provider in balance_sheet_data:
        k = balance_sheet_data[accounting_provider]
        balance_final = []
        for i in k:
            if(str(i["year"]) == year):
                balance_final.append(i)
                print("final" + str(jsonify({'balanceSheet': balance_final})))
        return jsonify({'balanceSheet': balance_final})
    else:
        return jsonify({'error': 'Accounting provider not found'}), 404
if __name__ == '__main__':
    app.run(debug=True, port=5001)
