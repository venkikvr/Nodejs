import Express from "express";
import employeeServices from "../services/employee.services.js";

const employeeRouter = Express.Router();
/// Emplyee routes
employeeRouter.post("/", employeeServices._createEmployee);
employeeRouter.get("/", employeeServices._getAllEmployee);
employeeRouter.get("/:id", employeeServices._getEmployeeById);
employeeRouter.put("/:id", employeeServices._updateEmployee);
employeeRouter.delete("/:id", employeeServices._deleteEmployee);

export default employeeRouter;
