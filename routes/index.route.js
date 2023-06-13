import Express from "express";
import employeeRouter from "./employee.route.js";

const routes = Express();

routes.use("/employee", employeeRouter);

export default routes;
