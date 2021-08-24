const express = require("express");
const fileController = require("../Controller/file.controller");
const Router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

Router.post("/:cloud/add", upload.single("files"), fileController.uploadFile); //to upload one file
Router.get("/all", fileController.fetchAllFile); //to get all files
Router.get("/one/:id", fileController.getOneFileDetails); //to get one file details
Router.delete("/delete/:storage/:id", fileController.deleteOneFile); //to delete one file

module.exports = Router;
