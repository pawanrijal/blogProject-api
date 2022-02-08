const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    // console.log(decoded);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
