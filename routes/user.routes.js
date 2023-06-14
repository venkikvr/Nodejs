import Express from "express";
import userServices from "../services/user.services.js";

const userRouter = Express.Router();

///User Routes
userRouter.post("/", userServices._createUser);
userRouter.get("/", userServices._getAllUsers);
userRouter.get("/:id", userServices._getUserById);
userRouter.put("/:id", userServices._updateUser);
userRouter.delete("/:id", userServices._deleteUser);

export default userRouter;
