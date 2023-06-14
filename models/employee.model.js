import { conn } from "../config/db.js";

const findEmployee = () => {
  return new Promise((reslove, reject) => {
    conn.query("SELECT * from employee", (error, results) => {
      if (error) {
        reject(error);
      }
      reslove(results);
    });
  });
};

const findEmployeeByID = (id) => {
  return new Promise((reslove, reject) => {
    conn.query("SELECT * from employee WHERE id =" + id, (error, results) => {
      if (error) {
        reject(error);
      }
      reslove(results);
    });
  });
};

const createEmployee = (employee) => {
  return new Promise(async (reslove, reject) => {
    try {
      const query = "INSERT INTO employee SET ?";
      const [result] = await conn.promise().query(query, employee);
      employee.id = result.insertId;
      reslove(employee);
    } catch (error) {
      reject(error);
    }
  });
};

const updateEmployee = (id, employee) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "UPDATE employee SET ? WHERE id = ?";
      const [result] = await conn.promise().query(query, [employee, id]);
      employee.id = id;
      employee.affectedRows = result.affectedRows;
      resolve(employee);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteEmployee = (id) => {
  return new Promise((reslove, reject) => {
    conn.query("DELETE from employee WHERE id=" + id, (error, results) => {
      if (error) {
        reject(error);
      }
      reslove(results);
    });
  });
};

export {
  findEmployee,
  findEmployeeByID,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
