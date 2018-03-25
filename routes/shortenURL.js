const express = require("express");
const router = express.Router();
const URL = require("../model/URL_model");
const fetch = require("fetch");
const encode = require("../demo/encode");

router.post("/", async (request, response, next) => {
  try {
    fetch.fetchUrl("http://" + request.body.url, async (error, meta, body) => {
      if (error) {
        response.status(404);
        response.json({ message: "Invalid URL" });
      } else {
        response.status(200);
        const updateUrl = await URL.findOne({ url: request.body.url });

        if (updateUrl) {
          response.json({ message: "url exists" });
        } else {
          const newUrl = new URL({
            url: request.body.url,
            hash: encode(
              request.body.url,
              await URL.find({}, urlObj => {
                return urlObj;
              })
            )
          });
          await newUrl.save();
          //console.log(newUrl);
          response.json({ message: "url saved" });
        }
      }
    });
  } catch (err) {
    console.log("error");
    next(err);
  }
});

module.exports = router;
