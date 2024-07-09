// Import the jsonwebtoken library, which is used to work with JSON Web Tokens (JWT).
const jwt = require("jsonwebtoken");

// Middleware function to protect routes by verifying the JWT.
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer".
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Extract the token from the authorization header.
    token = req.headers.authorization.split(" ")[1];
    
    try {
      // Verify the token asynchronously.
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) reject(err); // If there's an error, reject the promise.
          resolve(decoded); // Resolve the promise with the decoded token.
        });
      });

      // Add user information from the decoded token to the request object.
      req.user = { id: decoded.id };

      // Call the next middleware function.
      next();
    } catch (error) {
      // If token verification fails, log the error and send a 401 response.
      console.error("Not authorized, token failed");
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If no token is found in the authorization header, send a 401 response.
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Export the protect middleware function to be used in other parts of the application.
module.exports = { protect };
