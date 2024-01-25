import AWS from "aws-sdk";

import { config } from "./config";
import { dockerComposeConfig } from "./dynamodbConfig";
import { LoanApplication } from "./types";

const DynamodbConfig = process.env.STAGE === "test" ? dockerComposeConfig : {};

const dynamoDb = new AWS.DynamoDB.DocumentClient(DynamodbConfig);

export const decisionEngine = async (id: string) => {
  const params = {
    TableName: config.loanTable,
    Key: { id },
  };
  const results = await dynamoDb.get(params).promise();

  if (!results.Item) {
    throw Error("No Loan application found");
  }

  const application = results.Item as LoanApplication;

  const currentLoan = application.loan![0];

  if (!currentLoan) {
    throw Error("Loan amount not found");
  }

  const averageAssetValut =
    application.assets.reduce(function (prev, cur) {
      return prev + cur.assetValue;
    }, 0) / 12;

  const totalProfitOrLoss = application.assets.reduce(function (prev, cur) {
    return prev + cur.assetValue;
  }, 0);

  if (averageAssetValut > currentLoan?.amount) {
    return {
      approvedPercentage: "100%",
      amount: currentLoan?.amount,
      status: "Approved",
    };
  } else if (totalProfitOrLoss > 0) {
    return {
      approvedPercentage: "60%",
      amount: currentLoan?.amount,
      status: "Approved",
    };
  }
  return {
    approvedPercentage: "20%",
    amount: currentLoan?.amount,
    status: "Approved",
  };
};
