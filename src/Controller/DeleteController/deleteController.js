const cloudinary = require("../../Config/cloudinary");
const FilesModel = require("../../Models/file.model");
const createHttpError = require("http-errors");

module.exports = {
  deleteCloudinary: async (docID) => {
    try {
      const deleteFile = await FilesModel.findOneAndDelete({
        _id: docID,
      });
      console.log(deleteFile);
      var deleteCloudinaryFile = await cloudinary.uploader.destroy(
        deleteFile.file_id
      );
      return deleteCloudinaryFile;
    } catch (err) {
      return {
        status: 404,
        message: "Some Error happened!",
      };
    }
  },
  deleteOneDrive: async (bodyData) => {
    return bodyData;
  },
  deleteGDrive: async (bodyData) => {
    return bodyData;
  },
  deleteDropBox: async (bodyData) => {
    return bodyData;
  },
  deleteS3: async (bodyData) => {
    return bodyData;
  },
};
