const jwt = require("jsonwebtoken");
//const cookieParser = require("cookie-parser");
const authenticateJWT = (req, res, next) => {
/*  console.log(req.headers)
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // const token = authHeader
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "something wrong" });
      }
      req.user = user;
      next();
    });
  }
  else {
    res.status(401).send({ message: "no token exist" });
  } */
 
  // console.log("tooooookennnnnnnnn")
  // const token=req.headers.cookie.split('=')[1];
 
 
  try {
    console.log(req.cookies.access_token)
    const token = req.cookies.access_token;
    if (!token) {
      console.log("no token")
      return res.status(403).json({message:"no token"});
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "something wrong" });
      }
      req.user = user;
      next();
    });
  } catch {
    return res.sendStatus(403);
  }

};

module.exports = authenticateJWT;


