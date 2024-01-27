import AWS from "aws-sdk";

import { config } from "./config";
import { dockerComposeConfig } from "./dynamodbConfig";

const DynamodbConfig = process.env.STAGE === "test" ? dockerComposeConfig : {};

const dynamoDb = new AWS.DynamoDB.DocumentClient(DynamodbConfig);

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { LoanApplication } from "./types";

const sendResult = (application: LoanApplication) => {
  const totalAssetValue = application.assets.reduce(function (prev, cur) {
    return prev + cur.assetValue;
  }, 0);

  const totalProfileOrLoss = application.assets.reduce(function (prev, cur) {
    return prev + cur.profitOrLoss;
  }, 0);

  return {
    ...application,
    totalAssetValue,
    totalProfileOrLoss,
    hasLoan: application.loan && application.loan.length > 0 ? false : true,
  };
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!(event.pathParameters && event.pathParameters.id)) {
    throw Error("No Id provided");
  }


  const params = {
    TableName: config.loanTable,
    Key: { id: event.pathParameters.id },
  };
  const results = await dynamoDb.get(params).promise();


  return results.Item
    ? {
        statusCode: 200,
        body: JSON.stringify(sendResult(results.Item as LoanApplication)),
      }
    : {
        statusCode: 200,
        body: JSON.stringify({ assets:[] }),
      };
};
