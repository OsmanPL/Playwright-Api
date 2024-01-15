const playwrightRouter = require("./routes/playwright.route");
const config = require("./config/config");

var express = require("express");
var cors = require("cors");
var morgan = require("morgan");

var app = express();
const port = config.port;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", playwrightRouter);

app.get("/", function (req, res) {
  res.send("Bienvenido a Playwrigth-API");
});

app.listen(port, function () {
  console.log("Listening on port", port);
});
