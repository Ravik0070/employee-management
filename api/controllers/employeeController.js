const Employee = require("../models/Employee");
const DataModel = require('../models/Data'); 

//functions for admin only
exports.GetEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ role: { $ne: "Admin" } });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.GetEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      role: { $ne: "Admin" },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.UpdateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, role: { $ne: "Admin" } },
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.DeleteEmployee = async (req, res) => {
  try {
    const employeeToDelete = await Employee.findOne({
      _id: req.params.id,
      role: { $ne: "Admin" },
    });
    if (!employeeToDelete) {
      return res.status(404).send("Employee not found or is an Admin");
    }
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};


//functions for admin and managers
exports.GetAllData = async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.GetDataById = async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.DeleteData = async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//functions Admins, Managers, Employees
exports.UpdateData = async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.CreateData = async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

