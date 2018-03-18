const express = require("express");
const router = express.Router();
const decode = require("../demo/decode");

router.post("/", function(request, response) {
  const hashValue = request.body.hash;

  try {
    const url = decode(hashValue, ExistingURL);
    response.status(200);
    response.json({ url: expandURL });
  } catch (e) {
    response.status(404);
    response.json({
      message: `There is no long URL registered for hash value '${hashValue}'`
    });
  }
});

module.exports = router;
