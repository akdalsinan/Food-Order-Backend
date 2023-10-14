var express = require("express");
var router = express.Router();
var client = require("../config/db");

router.get("/food", function (req, res) {
  res.send("respond with a resource");
});

client.connect();

router.get("/getAllFood", function (req, res) {
  client.query("Select * from types", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
    client.end;
  });
});
router.get("/getAllPizza", function (req, res) {
  client.query("Select * from types where foodid=(1)", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
    client.end;
  });
});

router.get("/getAllHamburger", function (req, res) {
  client.query("Select * from types where foodid=(2)", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
    client.end;
  });
});

router.get("/getAllMakarna", function (req, res) {
  client.query("Select * from types where foodid=(3)", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
    client.end;
  });
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
  let insertQuery = `insert into types(typesname,foodid) values ('${food.typesname}','${foodid}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("asdasdsa");
    } else {
      res.send(err.message);
    }
    client.end;
  });
});

// -------------yemek silme servisi-------------------//

router.post("/foodDelete", function (req, res) {
  let insertQuery = `delete from types where id=${req.body.id}`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("silme başarılı");
    } else {
      res.send(err.message);
    }
    client.end;
  });
});

module.exports = router;
