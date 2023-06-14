import Express from "express";
import employeeRouter from "./employee.route.js";
import userRouter from "./user.routes.js";

const routes = Express();

routes.use("/employee", employeeRouter);
routes.use("/user", userRouter);

export default routes;
