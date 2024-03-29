const router = require("express").Router();
const {
    verifyTokenAndManagersOrAdmin,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
  } = require("../middleware/jwtVerification");
const employeeController = require("../controllers/employeeController");

//routes for admins only
router.get("/getemployee/:id",verifyTokenAndAdmin, employeeController.GetEmployeeById);
router.put("/updateemployee/:id",verifyTokenAndAdmin, employeeController.UpdateEmployee);
router.delete("/deleteemployee/:id",verifyTokenAndAdmin, employeeController.DeleteEmployee);
//file upload /delete / download

//routes for admin and managers
router.get("/getemployees",verifyTokenAndManagersOrAdmin, employeeController.GetEmployees);
router.delete("/deletedata/:id",verifyTokenAndManagersOrAdmin, employeeController.DeleteData);

//routes for admin and employee
//file download

//routes for all employees
router.get("/getdata",verifyTokenAndAuthorization, employeeController.GetAllData);
router.get("/getdata/:id",verifyTokenAndAuthorization, employeeController.GetDataById);
router.put("/updatedata/:id",verifyTokenAndAuthorization, employeeController.UpdateData);
router.post("/createdata",verifyTokenAndAuthorization, employeeController.CreateData);

module.exports = router;