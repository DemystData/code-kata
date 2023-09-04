from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for your app
def make_decision(pre_assessment):
    if pre_assessment == 60:
        return {'approval': 'Approved with 60% of Requested Value', 'reason': '60 preAssessment'}
    elif pre_assessment >=60 :
        return {'approval': 'Approved', 'reason': 'High preAssessment'}
    else:
        return {'approval': 'Rejected', 'reason': 'Low preAssessment'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5007)