const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const SECRET = process.env.SECRET;

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(304)
        .json({ success: false, Msg: "Unthorized, no token" });
    }

    if (
      req.headers.authorization &&
      req.headers.authoriztion.startsWtith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(SECRET, token, (err, data) => {
        if (err) {
          console.error(err);
          return res
            .status(400)
            .json({ success: false, Msg: "Wrong or Expired Token" });
        } else {
          req.user = data;
          next();
        }
      });
    }
  } catch (error) {
    console.eroor(err);
  }
};

module.exports = auth;
