//* Libraries
import { Router } from "express";
//* Controllers
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/usersController.js";
import { createUser } from "../controllers/signUpController.js";
import { logUserIn } from "../controllers/signInController.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => getUsers(req, res))

userRouter.get("/users/:id", async (req, res) => getUserById(req, res))

userRouter.post("/sign-up", async (req, res) => createUser(req, res))

userRouter.post("/sign-in", async (req, res) => logUserIn(req, res))

userRouter.put("/update-user/:id", async (req, res) => updateUser(req, res))

userRouter.delete("/delete-user/:id", async (req, res) => deleteUser(req, res))

export default userRouter