var express = require("express");
var router = express.Router();
var client = require("../config/db");

// Veritabanı bağlantısını yalnızca bir kez açın
client.connect(function (err) {
  if (err) {
    console.error("Veritabanına bağlanırken hata oluştu:", err);
  } else {
    console.log("Veritabanına başarıyla bağlandı.");
  }
})

router.get("/food", function (req, res) {
  res.send("respond with a resource");
})

router.get("/getAllFood", function (req, res) {
  client.query("Select * from types", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  })
});

router.get("/getAllPizza", function (req, res) {
  client.query("Select * from types where foodid=1", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  })
});

router.get("/getAllHamburger", function (req, res) {
  client.query("Select * from types where foodid=2", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  })
});

router.get("/getAllMakarna", function (req, res) {
  client.query("Select * from types where foodid=3", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  })
});

// -------------yemek ekleme servisi-------------------//
router.post("/addFood", function (req, res) {
  const food = req.body;
  let foodid;
  if (food.foodid === "pizza") {
    foodid = 1;
  } else if (food.foodid === "hamburger") {
    foodid = 2;
  } else if (food.foodid === "makarna") {
    foodid = 3;
  }
  let insertQuery = `insert into types(typesname,foodid,price) values ('${food.typesname}','${foodid}','${food.price}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Ekleme başarılı");
    } else {
      res.send(err.message);
    }
  })
});

// -------------yemek silme servisi-------------------//
router.post("/foodDelete", function (req, res) {
  let deleteQuery = `delete from types where id=${req.body.id}`;
  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Silme başarılı");
    } else {
      res.send(err.message);
    }
  })
});

module.exports = router;
