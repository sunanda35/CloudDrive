const express = require("express");
const fileController = require("../Controller/file.controller");
const Router = express.Router();

Router.post("/add", fileController.addFile); //to upload one file
Router.get("/all", fileController.getAllFile); //to get all files
Router.get("/one:id", fileController.getOneFileDetails); //to get one file details
Router.delete("/delete:id", fileController.deleteOneFile); //to delete one file

module.exports = Router;