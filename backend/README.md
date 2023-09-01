
Backend - Python 

Backend contains folder like 
1. ASP (Accounting software providers) which will provide the balance sheet for a selected business of the user in the year published. 

2. Decision engine - This is where the final application will be submitted to present the outcome of the application.

Dataset used in ASP : 
 balanced_sheet = {
"Xero": [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        //other entries .... 
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
and backend app.py will recieve the balance_sheet from ASP (asp.py)

decision.py contains logic :-
1. if "preAssessment": "60" means the Loan is favored to be approved 60% of the requested value.
2. else if "preAssessment" > "60" means loan is approved
3. else loan is rejected 


How to Run backend 

1. cd into backend folder
2. Run app.py, asp.py and decision.py using command python <filename>.py