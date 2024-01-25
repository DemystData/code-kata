### This application is build using https://sst.dev/ and application is acceesible under this url https://d1178wvsh56h6x.cloudfront.net/signup


## Project layout
This app is made up of two parts.

stacks/ — App Infrastructure

The code that describes the infrastructure of your serverless app is placed in the stacks/ directory of your project. SST uses AWS CDK, to create the infrastructure.

/packages/functions/ — App|BE Code
  - The code that’s run when your API is invoked is placed in the packages/functions/ directory of your project.

/packages/frontend/ — FE Code
  - The code that’s run when your API is invoked is placed in the packages/frontend/ directory of your project.
/- SST stack 
  - From here to deploy/remove infra in to aws 

To deploy or interact with code by yourself follow the below steps 

## Getting Started 

# prerequisites
   -Node.js 16 or later
   -We’ll be using TypeScript
   -An AWS account[https://sst.dev/chapters/create-an-aws-account.html] with the AWS CLI[https://sst.dev/chapters/configure-the-aws-cli.html] configured locally since sst expects aws cli in your local to create infra on AWS when we run sst commands

1. Install node modules in each of the following directories packages/frontend and packages/functions and in the current directory

2. Then run following command pnpm run deploy in the root directory  and this will get deploy both Fe(aws resources -static site distributed via cloud front) and Be(awsresources-api gateway, lambda functions and dynamo db) in to aws cloud that will generate api end point url to frontned url to interacted from browser / to debug use sst https://console.sst.dev/


## PROJECT STACK
1. React using vite [https://react.dev/]
2. API(node.js)[https://nodejs.org/en]
3. SST for building and deploying application[https://sst.dev/]
4. AWS cloud provider[https://aws.amazon.com/]