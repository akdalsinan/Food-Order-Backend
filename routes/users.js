var express = require("express");
var router = express.Router();
var client = require("../config/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

dotenv.config();

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
  });
});

// ------------- user login apı -------------------//

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
     return res.status(200).json({ message: "token süresi doldu" });
  }
});

router.post("/loginUser", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  client.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, result) => {
      if (!err) {
        if (result.rows.length === 1) {
          const storedUser = result.rows[0];

          const accessToken = jwt.sign(
            {
              email: storedUser.email,
              adress: storedUser.adress,
              nameSSurname: storedUser.namesurname,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
          );

          if (password === storedUser.password) {
            return res.status(200).json({
              accessToken: accessToken,
              message: "Giris basarili",
            });
          } else {
            res.send("Hatalı şifre");
          }
        } else {
          res.send("Kullanıcı bulunamadı");
        }
      } else {
        res.status(500).send(err.message);
      }
    }
  );
});

// -------------user add apı-------------------//

router.post("/addUser", function (req, res) {
  const user = req.body;
  let insertQuery = `insert into users(namesurname,password,email) values ('${user.namesurname}','${user.password}','${user.email}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("kayıt işlemi başarılı");
    } else {
      res.send(err.message);
    }
  });
});

// -------------user delete apı-------------------//

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
