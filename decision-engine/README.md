# Decision Engine

The Decision Engine is a module in this project that handles loan eligibility assessments based on pre-assessment criteria.

## Getting Started

To use the Decision Engine module in your project, follow these steps:

1. Clone the project repository.
2. Navigate to the "decision-engine" folder.
3. Install the required dependencies by running the command `npm install`.
4. Start the server by running the command `npm start`.

## Usage

The Decision Engine module provides an API endpoint `/getDecision` that accepts a POST request with the following parameters:

- `businessDetails`: An object containing details about the business, including the `loanAmount` requested.
- `preAssessment`: A number representing the pre-assessment score.

The API will respond with a JSON object containing the loan decision based on the pre-assessment score.

### Example Request

```http
POST /getDecision
Content-Type: application/json

{
  "businessDetails": {
    ...
    "loanAmount": 100000
  },
  "preAssessment": 60
}
```

### Example Response

```json
{
  "data": "Voila! You are eligible for 60% of the requested loan amount that is Rs. 60000/- only. Contact us for more details.",
  "type": "success"
}
```

## License

This project is licensed under the [MIT License](LICENSE).
