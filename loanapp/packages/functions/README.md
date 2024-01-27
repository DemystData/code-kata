# SST App

This is a typscript based application with backend in serverless.

Technologies used

1. SST (Serverless Stack)
2. AWS Services (Dynamodb, Api GW, Cloudfront, S3, Lambda... etc)

## Infra

all the infrastructure code can be found in the infra/stack.ts file, where tables are being created along with lambda functions attching to the Api.

## Code for backend

code for backend can be found under packages/functions
##
To deploy be under loan app and then run pnpm run deploy to deploy api stack

## Running Tests

1. Run dynamodb docker container on your local using below command
   ```
   docker run --rm -d -p 8000:8000 amazon/dynamodb-local

   ``` 
2. test/tables.ts file is connect to this docker container and createTables method will create table dyncmoadb table and test cases will keep wirting and reading the data from this table in the docker container
3. to run the test use below command

   ```
   yarn test
   ```