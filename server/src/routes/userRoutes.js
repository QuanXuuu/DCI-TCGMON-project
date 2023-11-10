import { Router } from "express";
import * as userController from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const userRouter = Router();

userRouter
	.post("/register", userController.register)
	.post("/login", userController.login)

	.get("/user/:id", checkAuth, userController.getUser)
	.get("/user", userController.getAllUsers)
	.patch("/user/:id", userController.updateUser)
	.delete("/user/:id", userController.deleteUser)
	.delete("/user", userController.deleteAllUsers);

export default userRouter;
