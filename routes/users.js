var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (password === "123")
    res.send("doğru");
  else res.send("yanlış");
});

router.get("/fav", function (req, res, next) {
  res.send("{adi:sinan, soyadi:akdal,sevdigi yemek:{pizza,hamburger,tost}}");
});



module.exports = router;
