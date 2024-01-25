import AWS from "aws-sdk";

import { dockerComposeConfig } from "./dynamodbConfig";

const DynamodbConfig = process.env.STAGE === "test" ? dockerComposeConfig : {};

const dynamoDb = new AWS.DynamoDB.DocumentClient(DynamodbConfig);

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { config } from "./config";
import { decisionEngine } from "./decision-engine";
import { updateExpression } from "./dynamodb-update-expression";

type UpdateInput = {
  loanAmount: number;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!(event.pathParameters && event.pathParameters.id)) {

    throw Error();
  }

  const loan = await decisionEngine(event.pathParameters.id);

  const exp = updateExpression({
    loan,
  });

  const params = {
    TableName: config.loanTable,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: exp.expression,
    ExpressionAttributeNames: exp.names,
    ExpressionAttributeValues: exp.values,
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
