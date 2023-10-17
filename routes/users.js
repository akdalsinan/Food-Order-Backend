var express = require("express");
var router = express.Router();
var client = require("../config/db");

/* GET users listing. */
router.get("/users", function (req, res, next) {
  res.send("respond sadasdasd a resource");
});

client.connect(function (err) {
  if (err) {
    console.error("Veritabanına bağlanırken hata oluştu:", err);
  } else {
    console.log("Veritabanına başarıyla bağlandı.");
  }
});

router.get("/getAllUsers", function (req, res) {
  client.query("Select * from users", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }

  })
});

router.post("/addUser", function (req, res) {
  const user = req.body;
  let insertQuery = `insert into users(namesurname,password,email) values ('${user.namesurname}','${user.password}','${user.email}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("kayıt işlemi başarılı");
    } else {
      res.send(err.message);
    }

  })
});

router.post("/userDelete", function (req, res) {
  let deleteQuery = `delete from users where id=${req.body.id}`;
  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Silme başarılı");
    } else {
      res.send(err.message);
    }
  });
});


module.exports = router;
