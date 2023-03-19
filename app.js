require("dotenv").config();
require("express-async-errors");
const authRouter = require("./routes/auth");

const connectDB = require("./db/connect");

// security;
const jwt = require("bcryptjs");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// express
const express = require("express");
const app = express();
app.set("trust proxy", 1);
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(xss());

// error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
require("express-async-errors");

app.get("/", (req, res) => {
  res.send(`<h1>Simple Auth API</h1>\n<a href='/docs'>API Documentation</a>`);
});

app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}... `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
