//* Libraries
import express from "express"
import cors from "cors"
//* Routes
import userRouter from "./Routes/userRouter.js"
import tokenRouter from "./Routes/tokenRouter.js"
import transactionRouter from "./Routes/transactionRouter.js"

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(tokenRouter)
app.use(transactionRouter)

app.listen(PORT, () => console.log(`Server Initialized. Port: ${PORT} `))
