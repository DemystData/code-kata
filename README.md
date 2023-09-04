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

## Project Objectives
* Building a loan application software which accepts loan application details from company.
* Accept company's details and call api to fetch Balance Sheet from chosen Accounting provider.
* Calculate PreAssesment value from profit and AssetValue of company and call api to send it along with necessary details to decisionEngine for final assesment.

## Project Implementation
* Used Next.js to implement both the frontend and backend of the project.
* Displayed a form in home page to accept Company Details and Account Provider of choice.
* Made a api call to api/balanceSheets to retrieve balance sheet of the entered company.
* The Balance Sheet is displayed on the page for the user to see along with profitorLoss of the company in the past year and Asset value. The page is rendered as per the selected accounting provider with it's name.
* The preAssesment value is calculated and displayed on the page along with a button to submit the details and Apply for loan.
* If the required details are succesfully sent to the API, then a success notification is observed at the bottom of the page.

## Assumptions
* While I have assumed the Accounting Software and Decision Engine are implemented, but I have created sample APIs for both to simulate the working of those 2 APIs.
* The Accounting Software simulation is retrieving data from data/BalanceSheets.json file which stores sample balance sheet data of companies.
* I could have dockerised the app by creating a production build using npm run build and docker build -t nextjs-docker and docker run -p 3000:3000 nextjs-docker.
But I abstained from it since then I had to retrieve data from js object instead of directly from a JSON file.
* I have kept the frontend UI at minimum and not looked to make it very asthetic.
* Haven't added any Database or full-fledged functionality for backend APIs and just done enough to simulate the API calls as per problem statement to maintain brevity and simplicity.

Recording of running app:
https://www.loom.com/share/1401b47b05494e65ba19bd4589b5bea0?sid=65c20637-2da6-465e-9da2-67dcba7c2711
