import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(AuthStack).stack(FrontendStack);
  }
} satisfies SSTConfig;
