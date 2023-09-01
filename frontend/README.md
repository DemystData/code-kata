
Frontend - ReactJS

1. User start the app , and the application is initiated and based on backend response if it is 200 then initiation is complete . based on these steps 
User ->> FE: Start Application

  FE ->> BE: Initiate Application
  BE ->> FE: Initiate Complete

2. user can fill the basic details then like loan amount, business name and year of establishement and ASP option then based on the input provided balanced sheet is fetched from the backend and backend is getting balance sheet from ASP. 
Based on these steps
User ->> FE: Fill Business Details & Loan amount
  User ->> FE: Select Accounting provider
  User ->> FE: Request Balance Sheet
  FE ->> BE: Fetch Balance Sheet
  BE ->> ASP: Request Balance Sheet
  ASP ->> BE: Return Balance Sheet
  BE ->> FE: Return Details for Review

3. then user can submit the application and see the output whether the loan is approved or rejected with preAssessment value and business details which is fetched from backend and backend get from the Decision. 

User --> FE: Review Complete
  User ->> FE: Submit Application

  FE ->> BE: Request outcome
  BE ->> BE: Apply Rules to summarise application
  BE ->> DE: Request Decision
  DE ->> BE: Returns outcome

  BE ->> FE: Application Result
  FE ->> User: Final Outcome


Output displayed on UI 

- Business Details such as:
  - Name
  - Year established
  - Summary of Profit or loss by the year
- preAssessment value as per the rules


How to run this 

1. go to the frontend folder 
2. In Terminal enter npm install to install the required dependencies
3. Then enter npm start to start the application