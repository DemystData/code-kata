

The system consists of the following:

- Frontend written in ReactJs
- Backend - API are created using Python Flask

The backend is also integrated with third-party providers such as:

- Decision engine - This is where the final application will be submitted to present the outcome of the application.
- Accounting software providers will provide a balance sheet for a selected business of the user.

Below is a sequence diagram to help visually understand the flow.

1. User will start the application by initiating the application, the initiation will be complete when backend will send a successful response back to the frontend. 
2. After initiating the application the user will be asked to fill details like 
   a. The business details 
   b. Loan Amount 
   c. Select Accounting Provider
3. Then based on the input values the user can request the balance sheet for that specific business to cross check the profitOrLoss details of a Company 
4. Then after the Review of the balance sheet is complete then user can click on submit application.
5. Then there are some loan approval rules which is applied based on which pre-Assessment value is calculated.
6. Then based on the pre Assessment value it is decided whether the loan will be approved/ rejected and how much loan amount will be provided by the bank. 

## Rules applied 

- If a business has made a profit in the last 12 months. The final value to be sent with a field `"preAssessment": "60"` which means the Loan is favored to be approved 60% of the requested value.
If the average asset value across 12 months is greater than the loan amount then `"preAssessment": "100"`
- Default value to be used `20`

## The Final output to be sent to the decision engine would contain minimum details such as

- Business Details such as:
  - Name
  - Year established
  - Summary of Profit or loss by the year
- preAssessment value as per the rules

## Docker

Also the application is containerized by using docker . Docker is a containerization platform that encapsulates your application, its dependencies, and configuration into lightweight containers. 
In this project, Docker ensures consistent and portable deployment of both the frontend and backend components. It simplifies environment setup, improves scalability, and enhances collaboration by isolating application components in self-contained units.

For the frontend and backend, Dockerfiles are utilized to specify their respective environments and dependencies. These Dockerfiles ensure isolation and reproducibility. Docker Compose is then used to combine these containers into a unified application stack, allowing for easy communication between the frontend and backend components 

Command to run with docker

1. docker-compose build
2. docker-compose up

application will run on http://localhost:3000/
