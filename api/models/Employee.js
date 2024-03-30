const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeID: { type: Number, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      required: true,
      default: "Employee",
    },
    image: { type: String },
    password: { type: String, required: true },
    loginHistory: [{ type: Date }],
  },
  { timestamps: true }
);

// Auto-increment Employee ID
employeeSchema.pre("save", async function (next) {
  try {
    if (!this.employeeID) {
      const lastDoc = await Employee.findOne(
        {},
        {},
        { sort: { employeeID: -1 } }
      );
      let lastID = lastDoc ? lastDoc.employeeID : 0; // Get the last employeeID, or default to 0 if no document found
      // Increment the last employeeID for the new employee
      this.employeeID = lastID + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
