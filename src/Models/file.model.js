const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      required: true,
    },
    storage_drive: {
      type: String,
      required: true,
    },
    file_size: {
      type: Number,
      required: true,
    },
    file_id: {
      type: String,
      required: true,
      unique: true,
    },
    format: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Files = mongoose.model("files", FileSchema);
module.exports = Files;
