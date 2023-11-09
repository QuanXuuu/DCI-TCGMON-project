import { Router } from "express";
import * as userController from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const userRouter = Router();

userRouter
  .post("/register", userController.register)
  .post("/login", userController.login)

  .get("/users/:id", checkAuth, userController.getUser)
  .get("/users", userController.getAllUsers)
  .patch("/user/:id", userController.updateUser)
  .delete("/users/:id", userController.deleteUser)
  .delete("/users", userController.deleteAllUsers);

export default userRouter;
