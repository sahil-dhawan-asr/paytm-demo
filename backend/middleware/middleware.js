var jwt = require("jsonwebtoken");

const JWT_SECRET = require("../config");

function authMiddleware(req, res, next) {
  if (req.headers["authorization"] !== undefined) {
    const headers = req.headers["authorization"].split(" ");
    try {
      const decoded = jwt.verify(headers[1], JWT_SECRET);
      req.userId = decoded.user._id;
      next();
    } catch (err) {
      return res.status(411).json({ message: err });
    }
  } else {
    return res.status(411).json({ message: "Token is required" });
  }
}

module.exports = authMiddleware;
