import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .get("/users/:id", userController.getUser)
  .get("/users", userController.getAllUsers)
  .patch("/users/:id", userController.updateUser)
  .delete("/users/:id", userController.deleteUser)
  .delete("/users", userController.deleteAllUsers);

export default userRouter;
