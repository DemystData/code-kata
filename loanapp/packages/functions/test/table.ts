import {
  CreateTableCommand,
  CreateTableInput,
  DynamoDBClient,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dockerComposeConfig } from "../src/dynamodbConfig";

const ddbClient = new DynamoDBClient({ ...dockerComposeConfig });

const client = DynamoDBDocumentClient.from(ddbClient);

const ProvisionedThroughput = {
  ReadCapacityUnits: 5,
  WriteCapacityUnits: 5,
};

export const loanTable: CreateTableInput = {
  TableName: "loan",
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput,
};

export const createTable = async (tables: "loan") => {
  const existingTables = await client.send(new ListTablesCommand({}));

  const isTableCreated = (existingTables.TableNames || []).includes(tables);

  if (!isTableCreated) {
    await client.send(new CreateTableCommand(loanTable));
  }
};
