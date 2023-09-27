const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const { initDb } = require("./helpers/database");
const { logError, sendError } = require("./middlewares/error-handling");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initDb().then(() => {
  console.log("DB connected");

  app.use("/users", require("./api/user/user.controller"));
  app.use("/accounts", require("./api/accounting/accounting.contoller"));
  app.use("/decision-engine",require("./api/decisionEngine/decision.contoller"));

  /*Error handling middlewares*/
  app.use(logError);
  app.use(sendError);
});

module.exports = app;
