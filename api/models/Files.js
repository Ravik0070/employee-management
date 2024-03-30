const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    employeeID: {
      type: Number,
      required: true,
    },
    adminID: {
      type: String,
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

const FileModel = mongoose.model("Files", FileSchema);

module.exports = FileModel;
