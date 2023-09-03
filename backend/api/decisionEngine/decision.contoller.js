const router = require('express').Router();
const {validateSchema} = require("../../middlewares/schema-validation");
const schema = require("./decision.schema");
const service = require("./decision.service");

router.post("/submit",validateSchema(schema.decisionEngine),service.decisionEngine);

module.exports = router;