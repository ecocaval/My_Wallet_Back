import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv"

const PORT = 5000
const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

let db

let mongoClient = new MongoClient(process.env.DATABASE_URL)

app.listen(PORT, () => console.log(`Server Initialized. Port: ${PORT} `))

try {
    await mongoClient.connect()
    db = mongoClient.db()
} catch (err) {
    console.log(err);
}






