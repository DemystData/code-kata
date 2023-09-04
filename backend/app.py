from flask import Flask, request, jsonify
import requests  # Import the requests library
from Decision.decision import make_decision


app = Flask(__name__)

# Define the base URL for the ASP API
ASP_BASE_URL = 'http://127.0.0.1:5004'  # Update this with the actual ASP API URL

@app.route('/api/initiate-application', methods=['POST'])
def initiate_application():
    try:
        # Perform initiation logic here
        # For example, you can set a flag indicating initiation
        
        # Respond with success status
        return jsonify({'message': 'Application initiated'}), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'An error occurred'}), 500

# Route to fetch balance sheet data from ASP
@app.route('/api/balance-sheet', methods=['GET'])
def get_balance_sheet():
    try:
        accounting_provider = request.args.get('accountingProvider')
        company_name = request.args.get('company')
        print(accounting_provider)
        # Make a request to the ASP API's endpoint to get balance sheet data
        asp_response = requests.get(f'{ASP_BASE_URL}/api/asp/balance-sheet?company={company_name.upper()}&accountingProvider=${accounting_provider}')
        
        if asp_response.status_code == 200:
            asp_data = asp_response.json()
            return jsonify({'balanceSheet': asp_data['balanceSheet']})
        else:
            return jsonify({'error': 'Failed to fetch balance sheet data from ASP check the business Name'}), asp_response.status_code
        
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'An error occurred'}), 500

@app.route('/api/decision-engine', methods=['POST'])
def decision_engine():
    pre_assessment = request.json.get('preAssessment')  # Assuming frontend sends the preAssessment value
    decision_result = make_decision(pre_assessment)
    return jsonify(decision_result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)


