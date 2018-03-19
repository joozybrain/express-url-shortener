const express = require("express");
const router = express.Router();
const decode = require("../demo/decode");
const urlModel = require("../model/URL_model");

// TODO: Implement functionalities specified in README
router.get("/:someHash", async function(request, response) {
  try {
    const hashObj = request.params.someHash;
    const ExistingURL = await urlModel.find({}, (err, obj) => {
      return obj;
    });

    response.status(200);
    response.redirect("http://" + decode(hashObj, ExistingURL));
  } catch (e) {
    response.status(404);
    response.json({
      message: `URL with hash value '${request.params.someHash}' does not exist`
    });
  }
});

module.exports = router;
