//* Libraries
import { Router } from "express";
//* Controllers
import { getTokens } from "../controllers/tokenControllers.js";

const tokenRouter = Router();

tokenRouter.get("/tokens", async (req, res) => getTokens(req, res))

export default tokenRouter