import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter
  .post("/register", userController.register)
  .post("/login", userController.login)

  .get("/users/:id", userController.getUser)
  .get("/users", userController.getAllUsers)
  .patch("/user/:id", userController.updateUser)
  .delete("/users/:id", userController.deleteUser)
  .delete("/users", userController.deleteAllUsers);

export default userRouter;

// .get("/user", userController.getUser) => no plural instead of /:id
// .get("/user", userController.getAllUsers) => no need
// .patch("/user", userController.updateUser)
// .delete("/user", userController.deleteUser);
// .delete("/users", userController.deleteAllUsers); => no need

// GET /user/123456
// GEt /user/147258
