//* Libraries
import { Router } from "express";
//* Controllers
import { getUserTransactions, insertTransaction } from "../controllers/transactionsController.js";
//* Schemas
import { validateSchema } from "../middlewares/SchemaMiddleware.js";
import { TransactionSchema } from "../schemas/TransactionSchema.js";
//* Middlewares
import { validateToken } from "../middlewares/TokenMiddleware.js";

const transactionRouter = Router()

transactionRouter.get("/users/:id/transactions", validateToken, getUserTransactions)

transactionRouter.post("/users/:id/transactions", validateToken, validateSchema(TransactionSchema), insertTransaction)

export default transactionRouter