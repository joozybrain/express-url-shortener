const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("fetch");
const shortenUrl = require("./routes/shortenURL");
const showURL = require("./routes/showURL");
const expandURL = require("./routes/expandURL");
const getHash = require("./routes/getHash")

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

const app = express();
app.use(bodyParser.json());
app.use("/shorten-url", shortenUrl);
app.use("/", showURL);
app.use("/expand-url", expandURL);
app.use("/", getHash)

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
