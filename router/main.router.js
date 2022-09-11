const router = require("express").Router();

const userController = require("../controller/user.controller");

const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/employee/create-multiple/random", userController.createMultipleRandomEmployees);
router.get("/employee/get/all", userController.getAllEmployees);
router.get("/employee/search", userController.searchEmployees);
router.get("/employee/get/all/sort", userController.getAllEmployeesSorted);
router.get("/employee/get/:page", userController.getEmployeesByPage);
router.post("/employee/login", userController.employeeLogin);
router.use(authenticateToken);
router.put("/employee/update", userController.updateEmployee);

module.exports = { router };