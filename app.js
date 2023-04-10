require("express-async-errors");
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001;
const router = require("./src/routers/index");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const mongoSanitize = require("express-mongo-sanitize");
//Middlewares
app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.urlencoded({ limit: "50mb", extended: true, parameterLimit: "50000" })
// );

app.get("/", (req, res) => {
  res.json({
    message: "hoş geldiniz",
  });
});

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use("/api", router);
// catch error
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`port ${port} serverda çalıştı.`);
});
