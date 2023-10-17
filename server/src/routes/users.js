import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter
	.post("/users", userController.createUser)
	.get("/users/:id", userController.getUser)
	.get("/users", userController.getAllUsers)
	.patch("/users/:id", userController.updateUser)
	.put("/users/:id", userController.replaceUser)
	.delete("/users/:id", userController.deleteUser)
	.delete("/users", userController.deleteAllUsers);

export default userRouter;
