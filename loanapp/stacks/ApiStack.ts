import { BillingMode } from "aws-cdk-lib/aws-dynamodb";
import { Api, StackContext, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const loanTable = new Table(stack, "LoanApplication", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
    cdk: {
      table: {
        billingMode: BillingMode.PAY_PER_REQUEST,
      },
    },
  });

  const api = new Api(stack, "LoanApi", {
    defaults: {
      function: {
        description: "Loan Api Lambda",
        environment: {
          LOAN_TABLE: loanTable.tableName,
        },
        runtime: "nodejs18.x",
      },
    },
    routes: {
      "GET    /loan/{id}": "packages/functions/src/get.handler",
      "POST   /loan/{id}": "packages/functions/src/initiate.handler",
      "PUT    /loan/{id}": "packages/functions/src/update.handler",
    },
  });

  api.attachPermissions([loanTable]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api,
  };
}