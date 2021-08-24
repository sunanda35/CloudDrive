const FileModel = require("../Models/file.model");
const createHttpError = require("http-errors");
const cloudinary = require("../Config/cloudinary");
const uploadController = require("./UploadController/upload.controller");
const deleteController = require("./DeleteController/deleteController");
const fs = require("fs");

module.exports = {
  uploadFile: async (req, res, next) => {
    try {
      const storageBox = req.params.cloud;
      const dataFile = req.file;
      switch (storageBox) {
        case "cloudinary":
          const cloudinary = await uploadController.cloudinary(dataFile);
          res.status(200).send(cloudinary);
          break;
        case "oneDrive":
          const oneDrive = await uploadController.oneDrive(dataFile);
          res.status(200).send(oneDrive);
          break;
        case "gDrive":
          const gDrive = await uploadController.gDrive(dataFile);
          res.status(200).send(gDrive);
          break;
        case "dropBox":
          const dropBox = await uploadController.dropBox(dataFile);
          res.status(200).send(dropBox);
          break;
        case "s3":
          const s3 = await uploadController.s3(dataFile);
          res.status(200).send(s3);
          break;
        default:
          next(
            createHttpError.NotFound("No Drive found with this name. Sorry!")
          );
      }
    } catch (err) {
      next(err);
    }
  },
  fetchAllFile: async (req, res, next) => {
    try {
      const allFiles = await FileModel.find({});
      if (allFiles.length === 0)
        return res.status(200).send({
          status: 200,
          message: "There is no file found!",
        });
      res.status(200).send(allFiles);
    } catch (err) {
      next(err);
    }
  },
  getOneFileDetails: async (req, res, next) => {
    try {
      const file_id = req.params.id;
      const cloudFileId = req.body.file_id;
      const deleteFile = await cloudinary.uploader.destroy(cloudFileId);
      if (deleteFile !== "ok") return next(deleteFile);
      const fileDetails = await FileModel.findOne({ _id: file_id });
      res.status(200).send(fileDetails);
    } catch (err) {
      next(err);
    }
  },
  deleteOneFile: async (req, res, next) => {
    try {
      const file_id = req.params.id;
      const storageBox = req.params.storage;
      switch (storageBox) {
        case "cloudinary":
          const deleteFile = await deleteController.deleteCloudinary(file_id);
          res.status(deleteFile.status).send(deleteFile);
          break;
        case "oneDrive":
          const oneDrive = await deleteController.oneDrive(dataFile);
          res.status(200).send(oneDrive);
          break;
        case "gDrive":
          const gDrive = await deleteController.gDrive(dataFile);
          res.status(200).send(gDrive);
          break;
        case "dropBox":
          const dropBox = await deleteController.dropBox(dataFile);
          res.status(200).send(dropBox);
          break;
        case "s3":
          const s3 = await deleteController.s3(dataFile);
          res.status(200).send(s3);
          break;
        default:
          next(
            createHttpError.NotFound("No Drive found with this name. Sorry!")
          );
      }
      res.status(200).send({
        status: 200,
        message: "File Deleted Successfully!",
      });
    } catch (err) {
      next(err);
    }
  },
};
