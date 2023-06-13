import * as dotenv from "dotenv";
import express, { json } from "express";
import { createPool } from "mysql2";

const app = express();

dotenv.config();
console.log("Port", process.env.PORT);
const port = process.env.PORT || 3002;

app.use(json());

const pool = createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

pool.getConnection((error, connection) => {
  if (error) {
    console.log("Error While connecting to the database");
    return;
  }
  console.log("connected to the databae...... ");
  connection.release();
});

app.get("/api/v1/employee", (req, res, next) => {
  pool.query("SELECT * from employee", (error, results) => {
    if (error) {
      next(error);
      return;
    }
    console.log("results", results);
    res.status(200).json({
      status: "Getting Employees successfully !! ",
      employees: results,
    });
  });
});

app.get("/api/v1/employee/:employeeId", (req, res, next) => {
  const { employeeId } = req.params;
  pool.query(
    "SELECT * from employee WHERE id =" + employeeId,
    (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.status(200).json({
        status: "Getting Employees successfully !! ",
        employees: results,
      });
    }
  );
});

app.post("/api/v1/employee", async (req, res, next) => {
  const employee = req.body;
  console.log("employee", employee);
  try {
    const query = "INSERT INTO employee SET ?";
    const [result] = await pool.promise().query(query, employee);
    console.log("result", result);
    employee.id = result.insertId;
    res.status(201).json({
      status: "Employee added successfully !!",
      employees: result,
    });
  } catch (error) {
    next(error);
    return;
  }
});

app.post("/api/v1/employee/all", async (req, res, next) => {
  const employee = req.body;
  const createEmployee = [];

  try {
    for (var employees of employee) {
      const query = "INSERT INTO employee SET ?";
      const [result] = await pool.promise().query(query, employee);
      employee.id = result.insertId;
      createEmployee.push(employees);
    }
    res.status(201).json({
      status: "Employee added successfully !!",
      employees: createEmployee,
    });
  } catch (error) {
    next(error);
    return;
  }
});

app.put("/api/v1/employee/:employeeId", async (req, res, next) => {
  const { employeeId } = req.params;
  const employee = req.body;
  try {
    const query = "UPDATE  employee SET ? WHERE id = ?";
    const [result] = await pool.promise().query(query, [employee, employeeId]);
    employee.id = result.insertId;
    employee.affectedRows = result.affectedRows;
    res.status(201).json({
      status: "Employee Updated successfully !!",
      employees: employee,
    });
  } catch (error) {
    next(error);
    return;
  }
});

app.delete("/api/v1/employee/:employeeId", (req, res, next) => {
  const { employeeId } = req.params;
  pool.query(
    "DELETE from employee WHERE id =" + employeeId,
    (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.status(200).json({
        status: " Employee deleted successfully !! ",
        affectedRows: results.affectedRows,
      });
    }
  );
});

app.get("/api/v1/user", (req, res, next) => {
  pool.query("SELECT * from user", (error, results) => {
    if (error) {
      next(error);
      return;
    }
    console.log("results", results);
    res.status(200).json({
      status: "Getting Users successfully !! ",
      users: results,
    });
  });
});

app.get("/api/v1/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  pool.query("SELECT * from user WHERE id =" + userId, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.status(200).json({
      status: "Getting users successfully !! ",
      users: results,
    });
  });
});

app.post("/api/v1/user", async (req, res, next) => {
  const user = req.body;
  console.log("employee", user);
  user.created_date = new Date();
  try {
    const query = "INSERT INTO user SET ?";
    const [result] = await pool.promise().query(query, user);
    console.log("result", result);
    user.id = result.insertId;
    res.status(201).json({
      status: "User added successfully !!",
      users: result,
    });
  } catch (error) {
    next(error);
    return;
  }
});

app.post("/api/v1/user/all", async (req, res, next) => {
  const user = req.body;
  const createUser = [];

  try {
    for (var users of user) {
      const query = "INSERT INTO user SET ?";
      const [result] = await pool.promise().query(query, user);
      user.id = result.insertId;
      createUser.push(users);
    }
    res.status(201).json({
      status: "Users added successfully !!",
      users: createUser,
    });
  } catch (error) {
    next(error);
    return;
  }
});
app.put("/api/v1/user/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const user = req.body;
  try {
    const query = "UPDATE  user SET ? WHERE id = ?";
    const [result] = await pool.promise().query(query, [user, userId]);
    user.id = result.insertId;
    user.affectedRows = result.affectedRows;
    res.status(201).json({
      status: "User Updated successfully !!",
      user: user,
    });
  } catch (error) {
    next(error);
    return;
  }
});
app.delete("/api/v1/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  pool.query("DELETE from user WHERE id =" + userId, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.status(200).json({
      status: " User deleted successfully !! ",
      affectedRows: results.affectedRows,
    });
  });
});
//error handling middleware
app.use((error, req, res, next) => {
  console.log("Error", error);
  res.status(500).json({
    status: "Internal server error",
    error: error,
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});

export default app;
