//* Libraries
import { Router } from "express";
//* Controllers
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/usersController.js";
import { createUser } from "../controllers/signUpController.js";
import { logUserIn } from "../controllers/signInController.js";
//* Middlewares
import { validateToken } from "../middlewares/TokenMiddleware.js";
import { validateSchema } from "../middlewares/SchemaMiddleware.js";
import { UserCreationSchema, UserLoginSchema, UserUpdateSchema } from "../schemas/UserSchema.js";

const userRouter = Router();

userRouter.get("/users", getUsers)

userRouter.get("/users/:id", validateToken, getUserById)

userRouter.post("/sign-up", validateSchema(UserCreationSchema), createUser)

userRouter.post("/sign-in", validateSchema(UserLoginSchema), logUserIn)

userRouter.put("/update-user/:id", validateToken, validateSchema(UserUpdateSchema), updateUser)

userRouter.delete("/delete-user/:id", validateToken, deleteUser)

export default userRouter