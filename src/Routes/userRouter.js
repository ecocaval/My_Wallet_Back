//* Libraries
import { Router } from "express";
//* Controllers
import { createUser, getUserById, getUsers } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => getUsers(req, res))

userRouter.get("/users/:id", async (req, res) => getUserById(req, res))

userRouter.post("/users", async (req, res) => createUser(req, res))

export default userRouter