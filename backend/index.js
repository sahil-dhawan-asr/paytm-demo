const express = require("express");
let bodyParser = require("body-parser");
const mainRouter = require("./routes/mainRouter");

const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
