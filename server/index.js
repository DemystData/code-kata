const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const db = require("./db.config");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
