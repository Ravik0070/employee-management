const Employee = require("../models/Employee");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

// Registration
exports.Register = async (req, res) => {
  try {
    // Check if the email or phone number already exists in the database
    const existingEmployee = await Employee.findOne({
      $or: [{ email: req.body.email }],
    });

    if (existingEmployee) {
      return res.status(400).send("Email already exists.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      department: req.body.department,
      position: req.body.position,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      role: req.body.role || "Employee",
    });
    console.log(req.body)
    await employee.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login
exports.Login = async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) return res.status(400).send("User not found");

    if (bcrypt.compare(req.body.password, employee.password)) {
      employee.loginHistory.push(new Date());
      await employee.save();
      const { password, ...employeeInfo } = employee._doc;
      const accessToken = jwt.sign(
        {
          email: employee.email,
          id: employee._id,
          role: employee.role,
          employeeID: employee.employeeID,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      res.json({ ...employeeInfo, accessToken });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
