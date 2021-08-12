const User = require("../Models/user.model");
const createHttpError = require("http-errors");
const { loginSchema, registerSchema } = require("../Helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} = require("../Helpers/jwt_helper");

module.exports = {
  register: async (req, res, next) => {
    try {
      const check = await registerSchema.validateAsync(req.body);
      const emailExist = await User.findOne({ email: check.email }); //check email exist or not
      if (emailExist) throw createHttpError.Conflict("Email already exists!");

      const user = new User(check);
      const savedUser = await user.save();
      const userData = {
        name: savedUser.name,
        email: savedUser.email,
      };
      const accessToken = await signAccessToken(savedUser.id, userData);
      const refreshToken = await signRefreshToken(savedUser.id);
      res
        .cookie("x-access-token", accessToken, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .send({
          accessToken,
          refreshToken,
          message: "You have successfully registered",
        });
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const check = await loginSchema.validateAsync(req.body);
      const user = await User.findOne({ email: check.email });
      if (!user) throw createHttpError.NotFound("User not exist!");
      if (check.password !== user.password)
        throw createHttpError.Unauthorized("Username or password invalid!");
      const userData = {
        name: user.name,
        email: user.email,
      };
      const accessToken = await signAccessToken(user.id, userData);
      const refreshToken = await signRefreshToken(user.id);
      res
        .cookie("x-access-token", accessToken, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .send({
          accessToken,
          refreshToken,
          message: "You have successfully logged in",
        });
    } catch (err) {
      if (err.isJoi === true)
        return next(
          createHttpError.BadRequest("Username or password invalid!")
        );
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      res
        .clearCookie("x-access-token")
        .status(200)
        .json({ status: 200, message: "Successfully logged out!" });
    } catch (err) {
      next(err);
    }
  },
};
