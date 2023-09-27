const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");
const schema = require("./user.schema");
const service = require("./user.service");

router.post("/profile", validateSchema(schema.createUser), service.createUser);

router.post("/login",validateSchema(schema.createUser),service.userLogin);

module.exports = router;
