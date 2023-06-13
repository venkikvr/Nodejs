import {
  findEmployee,
  findEmployeeByID,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employee.model.js";

const _createEmployee = async (req, res, next) => {
  try {
    const employee = await findEmployee();
    res.status(200).json({
      status: "Employee added successfully !!",
      employees: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
};
const _getAllEmployee = async (req, res, next) => {
  try {
    const employee = await findEmployee();
    res.status(200).json({
      status: "Employees Getting  successfully !!",
      employees: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
};
const _getEmployeeById = async (req, res, next) => {
  try {
    const employee = await findEmployeeByID(req.params.id);
    res.status(200).json({
      status: "Employee Getting  successfully !!",
      employees: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
};
const _updateEmployee = async (req, res, next) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    res.status(200).json({
      status: "Employees Updated  successfully !!",
      employees: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
};
const _deleteEmployee = async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);
    res.status(200).json({
      status: "Employees deleted  successfully !!",
      employees: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export default {
  _createEmployee,
  _getAllEmployee,
  _getEmployeeById,
  _updateEmployee,
  _deleteEmployee,
};
