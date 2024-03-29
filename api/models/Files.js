const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    adminID: {
      type: Number,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FileModel = mongoose.model("File", FileSchema);

module.exports = DataModel;
