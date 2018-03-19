const atob = require("atob");

function decode(hash, URLs) {
  const matchingUrls = URLs.filter(element => element.hash === hash);
 // console.log(matchingUrls);
  if (matchingUrls.length === 0) {
    throw new Error("url does not exist in our data store");
  }

  matchingUrl = URLs.filter(element => element.hash === hash)[0];
  return matchingUrl.url;
}

module.exports = decode;
