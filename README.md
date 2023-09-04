This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the Application - Loan Shark

Upon running the application you will land on the homepage of the application. Here you can sign in using your google account.
The app uses google-auth to get you logged in. Logging in with your email will create an entry corresponding to your email ID in the "users" collection on MongoDB Atlas. The database connection is achieved using the "mongoose" library using database models (schemas).

Upon log in you will have a button to apply for a loan. Upon applying for the loan you will be greeted with the page to request the balance sheet of your business from your accounting provider.

As the accounting service was meant to be mocked to return a balance sheet based on the business name and accounting provider, I have stored some documents on MongoDB Atlas, which will simulate the fetching of balance sheet based on the values that you will fill in the form. This process is dynamic and will fetch the data (balance sheet) from Atlas corresponding to the business name and the accounting.

I have stored sample balance sheet data in MongoDB Atlas.

Try the balance sheet request with the following parameters to test all the 3 cases for "preAssessment" value -

`preAssesmentValue: 100`

Business Name: Fantasy Premier League

Loan Amount: 1000 (less than the average Asset Value)

Accounting Provider: AccuFunds

`preAssesmentValue: 60`

Business Name: Fantasy Premier League

Loan Amount: 1000000000 (greater than the average Asset Value, but the business is profitable over the last 12 months)

Accounting Provider: AccuFunds

`preAssesmentValue: 20` 

Business Name: SportsPulse Media

Loan Amount: 1000000000 (greater than the average Asset Value and the business is not profitable over the last 12 months)

Accounting Provider: Apex Financial Services

After requesting the balance sheet, the user will recieve the data from the balance sheet in a tabular form. User can then review the data and submit application.

Requesting data with any other business names and accounting provider combination will display a balance sheet not found with a link to go back to the balance sheet request form page.

After submitting the loan application, the user will have a summary of his application which displays fields Business Name, Total Profit/Loss, Requested Loan Amount, Pre-Approved percentage and Pre-Approved amount.

Thank You!!

