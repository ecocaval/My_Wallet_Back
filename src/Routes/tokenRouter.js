//* Libraries
import { Router } from "express";

//* Controllers
import { getTokens } from "../controllers/tokenControllers.js";

const tokenRouter = Router();

tokenRouter.get("/tokens", getTokens)

export default tokenRouter