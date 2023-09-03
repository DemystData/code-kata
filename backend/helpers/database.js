const mongoose = require("mongoose");
const config = require("../config/config");

function getUrl(env) {
    const urlSuffix = `${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.db}?authSource=admin&readPreference=primary&retryWrites=true&w=majority`;
  
    switch (env) {
      case "dev":
        return `mongodb://${urlSuffix}`;
      default:
        return `mongodb+srv://${urlSuffix}`;
    }
  }

function initDb() {
    return new Promise(async (res, rej) => {
      const url = getUrl(config.env);
      try {
        db = await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
  
        res(mongoose);
      } catch (err) {
        rej(err);
      }
    });
  }
  
  module.exports = {
    initDb,
  };