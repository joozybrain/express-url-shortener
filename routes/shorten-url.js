const express = require("express")
const fetch = require("fetch");
const router = express.Router();

router.post(function(request, response) {
    fetch.fetchUrl("http://" + request.body.url, (error, meta, body) => {
      if (error) {
        response.status(404);
        response.json({ message: "Invalid URL" });
      } else {
        response.status(200);
        response.json({ hash: `${encode(request.body.url, existingURLs)}` });
      }
    });
  });

  module.exports = router;