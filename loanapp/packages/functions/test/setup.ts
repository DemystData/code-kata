import { APIGatewayProxyEventV2 } from "aws-lambda";

process.env = {
  ...process.env,
  STAGE: "test",
  LOAN_TABLE: "loan",
};

export const event = (
  pathParameter: string,
  body: any
): APIGatewayProxyEventV2 => ({
  headers: {
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "content-length": "319",
    "content-type": "application/json",
    host: "loanapp.net",
    "postman-token": "f8860ad8-13bf-40c7-b524-6b17e6d9df91",
    "user-agent": "PostmanRuntime/7.29.2",
    "x-amzn-trace-id": "Root=1-63134fd4-23a2178d00d93eac18606a83",
    "x-forwarded-for": "141.168.73.238",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https",
  },
  body: JSON.stringify(body),
  pathParameters: {
    id: pathParameter,
  },
  version: "2.0",
  routeKey: "GET /loan/customerId",
  rawPath: "/loan",
  rawQueryString: "",
  isBase64Encoded: false,
  requestContext: {
    accountId: "553929853619",
    apiId: "cgmcayuqr3",
    domainName: "loanapp.net",
    domainPrefix: "api",
    http: {
      method: "GET",
      path: "/loan/customerId",
      protocol: "HTTP/1.1",
      sourceIp: "141.168.73.238",
      userAgent: "PostmanRuntime/7.29.2",
    },
    requestId: "X4lpRgaCywMEJGQ=",
    routeKey: "GET /loan",
    stage: "$default",
    time: "03/Sep/2022:13:00:04 +0000",
    timeEpoch: 1662210004792,
  },
});
