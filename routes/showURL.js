const URL = require("../model/URL_model");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const urls = await URL.find({});
    response.json({ url: urls });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
