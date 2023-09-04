# [Loan Application](https://loanr.vercel.app)

This is a web application for managing loan applications. It allows users to submit loan applications, review their application status, and view the result of their application.

[Click here](https://loanr.vercel.app) to check out the application

## Features

- User registration and login (with Credentials but also can easily extend this by adding multiple oauth services like google oauth or microsoft etc.)
- Loan application submission
- Application review and status tracking
- Display of application result
- Dashboard with balance sheet information
- Dockerised application, hence easy and consistent to packages and builds

## Technologies Used

- Front-end:
  - React.js
  - Next.js
  - Tailwind CSS
- Back-end:
  - Express.js
  - Node.js
- Database:
  - MongoDB

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository: [https://github.com/bhaweshverma50/demyst-loan-app.git](https://github.com/bhaweshverma50/demyst-loan-app.git)
2. Install dependencies: `cd loan-app && yarn || npm install`
3. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the required environment variables:
     DATABASE_URL, NEXTAUTH_SECRET, NODE_ENV

   4. Start the development server:
   5. Open your browser and visit `http://localhost:3000` to access the application.

   ## Deployment

   The application is deployed on Vercel and can be accessed at [https://loanr.vercel.app](https://loanr.vercel.app).

   ## User-Friendly and Responsive Design

   This application has a highly modern and responsive design, built using the latest frameworks and technologies. It provides a user-friendly interface that is easy to use and navigate.

   ## License

   This project is licensed under the [MIT License](LICENSE).

   ## Acknowledgements

   - [React](https://reactjs.org/)
   - [Next.js](https://nextjs.org/)
   - [Express.js](https://expressjs.com/)
   - [Tailwind CSS](https://tailwindcss.com/)
   - [MongoDB](https://www.mongodb.com/)
   - [Shadcn/UI](https://ui.shadcn.com/)
