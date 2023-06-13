// console.log("hello venki");

import express, { json } from "express";
const app = express();

const port = 3001;

let employees = [
  {
    id: 1,
    name: "sai",
    email: "sai@gmail.com",
    age: 24,
  },
  {
    id: 2,
    name: "sainadh",
    email: "sainadh@gmail.com",
    age: 26,
  },
  {
    id: 3,
    name: "ram",
    email: "ram@gmail.com",
    age: 24,
  },
  {
    id: 4,
    name: "venki",
    email: "venki@gmail.com",
    age: 26,
  },
];

app.use(json());

app.get("/api/v1/employee", (req, res) => {
  res.json({
    status: "200",
    employees: employees,
  });
});

app.get("/api/v1/employee/:employeeId", (req, res) => {
  // console.log(req.params);
  const { employeeId } = req.params;
  // console.log(employeeId);
  const employee = employees.find((employee) => employee.id == employeeId);
  // console.log(employee);
  res.json({
    status: "200",
    employees: employee,
  });
});

app.post("/api/v1/employee", (req, res) => {
  const employee = req.body;
  const newEmployees = employees.sort((a, b) => b.id - a.id);
  // console.log(newEmployees);
  const newId = newEmployees[0].id + 1;
  employee.id = newId;
  employees.push(employee);
  res.json({
    status: "200",
    employees: employee,
  });
});

app.put("/api/v1/employee/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  const employee = req.body;
  const newEmployees = employees.map((value) =>
    value.id == employeeId ? { ...value, ...employee } : value
  );
  console.log(newEmployees);
  employees = newEmployees;
  res.json({
    status: "200",
    employees: { employeeId, ...employee },
  });
});

app.delete("/api/v1/employee/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  console.log(employeeId);
  const newEmployees = employees.filter((value) => value.id != employeeId);
  employees = newEmployees;
  res.json({
    status: " employee deleted successfully",
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
