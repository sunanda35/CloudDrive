const FileModel = require("../Models/file.model");
const createHttpError = require("http-errors");
const cloudinary = require("../Helpers/cloudinary");
const fs = require("fs");

module.exports = {
  addFile: async (req, res, next) => {
    try {
      const imageToUpload = req.file;
      const uploadImage = await cloudinary.uploader.upload(
        imageToUpload.path,
        {
          folder: "cloud_drive",
        },
        (err, result) => {
          fs.unlinkSync(imageToUpload.path);
          if (err) return next(err);
          // console.log(result);
        }
      );
      const uploadData = new FileModel({
        file_name: imageToUpload.originalname,
        file_type: imageToUpload.mimetype,
        file_size: imageToUpload.size,
        file_id: uploadImage.public_id,
        format: uploadImage.format,
        url: uploadImage.secure_url,
      });
      const saveData = await uploadData.save();
      res.status(200).send({
        status: 200,
        message: "File Uploaded Successfully!",
        data: saveData,
      });
    } catch (err) {
      next(err);
    }
  },
  getAllFile: async (req, res, next) => {
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
      const deleteFile = await FileModel.findByIdAndDelete(file_id);
      res.status(200).send({
        status: 200,
        message: "File Deleted Successfully!",
      });
    } catch (err) {
      next(err);
    }
  },
};
