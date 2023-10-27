const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; //tokeni iki parçaya bölüyoruz ve ikinci parçayı alıyoruz

  if (!token) return res.status(401).json({ message: "giriş yapın" }); //token yoksa hata mesajı ver

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Token süresi doldu" });
    }
    req.user = user;
    next();
  });
};

module.exports={authMiddleware}