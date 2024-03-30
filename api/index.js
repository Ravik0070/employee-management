//import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

//to use secret enbvironment variables
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoString = process.env.DB_URL;

// datatbase connection
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("connected to db");
});

//create express app
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);


// uploading files
app.post("/api/upload", upload.single("file"), function (req, res) {
  try {
    const file = req.file;
    res.status(200).json(file.filename);
  } catch (error) {
    console.log(error);
  }
});

//listen port
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
