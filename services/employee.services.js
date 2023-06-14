import {
  findEmployee,
  findEmployeeByID,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employee.model.js";
import msg from "../utils/response.js";

const _createEmployee = async (req, res, next) => {
  try {
    const employee = await createEmployee(req.body);
    return msg.successMsg(res, 201, employee, "Employee added successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _getAllEmployee = async (req, res, next) => {
  try {
    const employee = await findEmployee();
    return msg.successMsg(
      res,
      200,
      employee,
      "Employee Getting successfully !!"
    );
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _getEmployeeById = async (req, res, next) => {
  try {
    const employee = await findEmployeeByID(req.params.id);
    return msg.successMsg(
      res,
      200,
      employee,
      "Employee Getting successfully !!"
    );
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _updateEmployee = async (req, res, next) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    return msg.successMsg(
      res,
      200,
      employee,
      "Employee Updated successfully !!"
    );
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _deleteEmployee = async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);
    return msg.successMsg(
      res,
      200,
      employee,
      "Employee deleted successfully !!"
    );
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
export default {
  _createEmployee,
  _getAllEmployee,
  _getEmployeeById,
  _updateEmployee,
  _deleteEmployee,
};
