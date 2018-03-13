const express = require("express");
const bodyParser = require("body-parser");

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

const app = express();
app.use(bodyParser.json());

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

// TODO: Implement functionalities specified in README
app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.post("/shorten-url/", function(request, response) {
  response.status(200);
  response.json({ hash: `${encode(request.body.url, existingURLs)}` });
});

app.post("/expand-url/", function  (request, response) {
  const hashValue = request.body.hash;
  
  try {
    const expandURL = decode(hashValue,existingURLs);
    response.status(200);
    response.json({ url: expandURL})
  } catch (e) {
    response.status(404)
    response.json({message: `There is no long URL registered for hash value '${hashValue}'`})
  }
  
})

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
