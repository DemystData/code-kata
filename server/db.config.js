const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Connection error", error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
