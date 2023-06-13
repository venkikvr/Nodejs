import * as dotenv from "dotenv";
import express, { json } from "express";
import routes from "./routes/index.route.js";
import { checkConnection } from "./config/db.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 3002;

checkConnection();

//Middlewares

app.use(json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/v1/", routes);

//Error Handling Middleware
app.use((error, req, res, next) => {
  console.log("Error", error);
  res.status(500).json({
    status: "Internal server error",
    error: error,
  });
});

//Running on port
app.listen(port, () => {
  console.log("server is running on port " + port);
});

export default app;
