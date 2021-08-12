const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  file_type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

const Files = mongoose.model("files", FileSchema);
module.exports = Files;
