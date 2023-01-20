//* Libraries
import express from "express"
import cors from "cors"
//* Routes
import userRouter from "./Routes/userRouter.js"
import tokenRouter from "./Routes/tokenRouter.js"

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(tokenRouter)

app.listen(PORT, () => console.log(`Server Initialized. Port: ${PORT} `))
