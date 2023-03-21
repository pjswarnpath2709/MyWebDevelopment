const router = require("express").Router();

const employeeController = require("../controllers/employee");

router.get("/", employeeController.getAllEmployee);

router.get("/data", employeeController.getAnalytics);

router.get("/:employeeId", employeeController.getEmployee);

router.post("/create", employeeController.createEmployee);

router.put("/:employeeId", employeeController.updateEmployee);

router.delete("/:employeeId", employeeController.deleteEmployee);

module.exports = router;
