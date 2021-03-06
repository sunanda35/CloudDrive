const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
require("dotenv").config();

module.exports = {
  signAccessToken: (userID, userData) => {
    return new Promise((resolve, reject) => {
      const payload = userData;
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const option = {
        expiresIn: "5h",
        issuer: "sunanda",
        audience: userID,
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },
  signRefreshToken: (userID) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const option = {
        expiresIn: "2y",
        issuer: "sunanda",
        audience: userID,
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    const accessToken = req.cookies["x-access-token"];
    if (!accessToken) return next(createHttpError.Unauthorized());
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          next(createHttpError.Unauthorized());
        } else {
          next(createHttpError.Unauthorized(err.message));
        }
      }
      req.payload = payload;
      next();
    });
  },
};
