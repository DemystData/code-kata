const app = require("./server");
const config = require("./config/config");

app.listen(config.port, (err) => {
  if (err) throw err;

  console.log(`Server up on ${config.port}`);
});
