//* Libraries
import bcrypt from "bcrypt"
//* Schemas
import { UserCreationSchema } from "../schemas/UserSchema.js"
//* Configuration
import db from "../config/dabaBaseConnection.js"
//* functions
import sanitizeInfo from "../validations/sanitizeInfo.js"

export async function createUser(req, res) {

    try {
        const userRequest = await UserCreationSchema.validateAsync(sanitizeInfo(req.body), { abortEarly: false })

        const emailInUse = await db.collection("users").findOne({ email: userRequest.email })

        if (emailInUse) return res.status(406).send("Invalid email.")

        userRequest.password = await bcrypt.hash(userRequest.password, 10)

        const insertUser = await db.collection("users").insertOne({ ...userRequest })

        if (insertUser.acknowleged) return res.status(201).send("User was created sucessfully!.")

        return res.sendStatus(200)

    } catch (err) {
        console.log(err);

        if (err.isJoi) return res.sendStatus(422)

        return res.sendStatus(500)
    }
}