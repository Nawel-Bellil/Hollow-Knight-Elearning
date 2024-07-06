// import jwt : the module that provides methods to work with json web tokens
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    // get the token from the header
  let token;
//Bearer : common convention for sending JWTs in http headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //extract token : ''Bearer token ''
    token = req.headers.authorization.split(" ")[1];
    try {
      // Verify token
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });

      // Add user from payload
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      console.error("Not authorized, token failed");
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
