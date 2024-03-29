const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    employeeID: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DataModel = mongoose.model("Data", DataSchema);

module.exports = DataModel;
