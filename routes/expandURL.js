const express = require("express");
const router = express.Router();
const decode = require("../demo/decode");
const urlModel = require("../model/URL_model");

router.post("/", async function(request, response) {
  const hashValue = request.body.hash;

  try {
    const ExistingURL = await urlModel.find({}, (err, obj) => {
      return obj;
    });
    //console.log(ExistingURL);
    const url = decode(hashValue, ExistingURL);
    response.status(200);

    response.json({ url: url });
  } catch (e) {
    response.status(404);
    response.json({
      message: `There is no long URL registered for hash value '${hashValue}'`
    });
  }
});

module.exports = router;
