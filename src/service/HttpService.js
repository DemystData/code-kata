const axios = require("axios");

async function request(method, url, data = null) {
  const config = {
    method,
    url,
    data,
  };

  const response = await axios(config);
  return response.data;
}

module.exports = { request };
