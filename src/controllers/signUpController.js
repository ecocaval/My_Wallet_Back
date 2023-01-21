//* Libraries
import bcrypt from "bcrypt"
//* Configuration
import db from "../config/dabaBaseConnection.js"
//* functions
import sanitizeInfo from "../validations/sanitizeInfo.js"

export async function createUser(req, res) {
    try {
        const userRequest = req.sanitizedBody

        const emailInUse = await db.collection("users").findOne({ email: userRequest.email })

        if (emailInUse) return res.sendStatus(409)

        userRequest.password = await bcrypt.hash(userRequest.password, 10)

        const insertUser = await db.collection("users").insertOne({ ...userRequest })

        if (!(insertUser.acknowledged === true)) throw new Error

        return res.sendStatus(201)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}