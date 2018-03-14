const express = require("express")
const router = express.Router();

router.get(function(request, response) {
    const hashObj = request.params.someHash;
    try {
      console.log(hashObj);
      response.status(200);
      response.redirect("http://" + decode(hashObj, existingURLs));
    } catch (e) {
      response.status(404);
      response.json({
        message: `URL with hash value '${hashObj}' does not exist`
      });
    }
  });
  

module.exports = router;