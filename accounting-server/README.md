# Accounting Server

The Accounting Server is a backend application that simulates accounting-related functionality for a financial system. It provides APIs for managing balance sheets, like fetching and genarating random sheets for businesses.

## Features

- Generate random balance sheets for different years and months
- Calculate profit or loss based on randomly generated data
- Manage assets value for each month in the balance sheet
- APIs for retrieving balance sheets, financial reports, and transaction details

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Installation

1. Clone the repository: [https://github.com/bhaweshverma50/demyst-loan-app.git](https://github.com/bhaweshverma50/demyst-loan-app.git)
2. Install dependencies:

```bash
   cd accounting-server && yarn || npm i
```

3. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the required environment variables:

   ```env
      PORT=<port>
   ```

   4. Start the server:

   ```bash
      yarn start || npm start
   ```

   5. The server will start running on `http://localhost:<port>`.

   ## API Documentation

   The API documentation can be found in the [API.md](API.md) file. It provides details on the available endpoints, request/response formats, and authentication requirements.

   ## Deployment

   The Accounting Server can be deployed on any hosting platform that supports Node.js applications. Ensure that the necessary environment variables are properly configured for the deployment environment.

   ## License

   This project is licensed under the [MIT License](LICENSE).

   ## Acknowledgements

   - [Node.js](https://nodejs.org/)
   - [Express.js](https://expressjs.com/)
   - [MongoDB](https://www.mongodb.com/)
