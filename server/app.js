const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://omar:8gdA9LSFCufTzqg@cluster0.qwvqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
require("./models/items");
require("./models/invoices");
require("./models/companyInfo");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const cors = require("cors");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
