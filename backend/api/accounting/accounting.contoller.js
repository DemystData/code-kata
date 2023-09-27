const router = require("express").Router();
const service = require("./accounting.service");


router.get("/balance-sheet/:provider",service.getDetails);

module.exports = router;