const express = require("express");
const config = require("./config/default.json");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const debug = require("./utils/logger")("app:server");
const appRoutes = require("./app");
const { expressjwt: expressJwt } = require("express-jwt");

const app = express();
const sec = config.jwt;
const secret = sec.secret

// Middleware
app.use(express.json());

// const jwt = config.jwt;
const jwtMiddleware = expressJwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({
  path: ["/login", "/register"],
});

// app.use("/", jwtMiddleware, appRoudtes);
app.post("/", jwtMiddleware, (req, res) => {
  //...
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = config.port;

// Connect to the database
mongoose
  .connect(config.database.uri)
  .then(() => {
    console.log("connected to database");
    debug("Connected to the database");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    debug("Error connecting to the database:", err);
  });

app.on("error", (err) => {
  console.log("Server error:", err);
});
