from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your app


# Added a Dummy Data 
balance_sheet_data = {
            "ABC": [
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
                },
                {
                    "year": 2020,
                    "month": 8,
                    "profitOrLoss": 8000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 7,
                    "profitOrLoss": -1800,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 6,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                }
            ],
            "DEMYST": [
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
                    "profitOrLoss": 187000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 8,
                    "profitOrLoss": 8000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 7,
                    "profitOrLoss": 1800,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 6,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 5,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 4,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 3,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 2,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
                {
                    "year": 2020,
                    "month": 1,
                    "profitOrLoss": 7000,
                    "assetsValue": 223452
                },
            ],
            "XYZ": [
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
                    "assetsValue": 0
                }
            ]
}

@app.route('/api/asp/balance-sheet', methods=['GET'])
def get_asp_balance_sheet():
    company_name = request.args.get('company')
    accounting_provider = request.args.get('accountingProvider')
    print(company_name)
    print(accounting_provider)
    if company_name.upper() in balance_sheet_data:
        k = balance_sheet_data[company_name]
        return jsonify({'balanceSheet': k})
    else:
        return jsonify({'error': 'Business not found in our database'}), 404
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5004)
