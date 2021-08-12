const express = require("express");
const Router = express.Router();
const AuthController = require("../Controller/auth.controller");

Router.post("/register", AuthController.register); //new users register

Router.post("/login", AuthController.login); //existing user login

Router.delete("/logout", AuthController.logout); //logged in user logout

module.exports = Router;
