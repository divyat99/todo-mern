const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    try {
      //console.log("MIDDLEWARE")
      const decodedToken = jwt.verify(token, process.env.secretKey);

      req.userId = decodedToken.id; // Attach decoded token to request object
      //console.log(decodedToken,'decodedToken')
      //console.log(req.userId,"req.userId")
      next(); // Move to the next middleware or route handler
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }

  }

});

module.exports = validateToken;
