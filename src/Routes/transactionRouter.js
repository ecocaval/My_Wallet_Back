//* Libraries
import { Router } from "express";

//* Controllers
import { deleteTransaction, getUserTransactions, insertTransaction, updateTransaction } from "../controllers/transactionsController.js";

//* Schemas
import { validateSchema } from "../middlewares/SchemaMiddleware.js";
import { TransactionPutSchema, TransactionSchema } from "../schemas/TransactionSchema.js";

//* Middlewares
import { validateToken } from "../middlewares/TokenMiddleware.js";

const transactionRouter = Router()

transactionRouter.get("/users/:id/transactions", validateToken, getUserTransactions)

transactionRouter.post("/users/:id/transactions", validateToken, validateSchema(TransactionSchema), insertTransaction)

transactionRouter.put("/users/:id/transactions/:transactionId", validateToken, validateSchema(TransactionPutSchema), updateTransaction)

transactionRouter.delete("/users/:id/transactions/:transactionId", validateToken, deleteTransaction)

export default transactionRouter