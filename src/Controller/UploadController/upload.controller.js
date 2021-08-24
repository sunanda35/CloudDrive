const cloudinary = require("../../Config/cloudinary");
const FilesModule = require("../../Models/file.model");
const fs = require("fs");

module.exports = {
  cloudinary: async (file) => {
    try {
      const data = await cloudinary.uploader.upload(
        file.path,
        {
          folder: "cloud_drive",
        },
        (err, result) => {
          //   fs.unlinkSync(file.path);
          if (err) {
            return err;
          }
          console.log("Successfully uploaded to Cloudinary!");
        }
      );
      const fileData = new FilesModule({
        name: file.originalname,
        file_type: data.resource_type,
        storage_drive: "cloudinary",
        file_size: file.size,
        file_id: data.public_id,
        format: data.format,
        url: data.secure_url,
      });
      const savedFileData = await fileData.save();
      return savedFileData;
    } catch (err) {
      fs.unlinkSync(file.path);
      return {
        status: 404,
        message: "Something Wrong. File not uploaded!",
      };
    }
  },
  oneDrive: async (file) => {
    return "Its oneDrive storage file upload";
  },
  gDrive: async (file) => {
    return "Its gDrive storage file upload";
  },
  dropBox: async (file) => {
    return "Its dropbox storage file upload";
  },
  s3: async (file) => {
    return "Its s3 storage file upload";
  },
};
