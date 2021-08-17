const Files = require("../Models/file.model");
const createHttpError = require("http-errors");
const cloudinary = require("../Helpers/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});

module.exports = {
  addFile: async (req, res, next) => {
    try {
      const imageToUpload = req.body.image;

      const uploadImage = await cloudinary.uploader.upload(imageToUpload, {
        upload_preset: "ml_default",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      });
      console.log(uploadImage);
      res.send({ uploadImage });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getAllFile: async (req, res, next) => {
    try {
      res.send("get all files");
    } catch (err) {
      next(err);
    }
  },
  getOneFileDetails: async (req, res, next) => {
    try {
      const file = req.params.id;
      res.send(`get one file details with ${file}`);
    } catch (err) {
      next(err);
    }
  },
  deleteOneFile: async (req, res, next) => {
    try {
      const file = req.params.id;
      res.send(`delete one file with id: ${file}`);
    } catch (err) {
      next(err);
    }
  },
};
