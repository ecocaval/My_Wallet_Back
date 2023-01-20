//* Libraries
import { ObjectId } from "mongodb"
import bcrypt from "bcrypt"
//* Schemas
import { UserSchema } from "../schemas/userSchema.js"
//* Configuration
import db from "../config/dabaBaseConnection.js"
//* functions
import sanitizeInfo from "../validations/sanitizeInfo.js"

export async function getUsers(req, res) {

    try {
        let users = await db.collection("users").find().toArray()
        
        return res.status(200).send(users)

    } catch (err) {
        console.log(err);

        return res.sendStatus(500)
    }
}

export async function getUserById(req, res) {

    const userId = ObjectId(req.params.id)

    try {
        const userInDb = await db.collection("users").findOne({ _id: userId })

        if (!userInDb) return res.status(404).send("User not found.")

        return res.status(200).send(sanitizeInfo(userInDb))

    } catch (err) {
        console.log(err);

        return res.sendStatus(500)
    }
}

export async function createUser(req, res) {

    try {
        const userRequest = await UserSchema.validateAsync(sanitizeInfo(req.body), { abortEarly: false })

        const emailInUse = await db.collection("users").findOne({ email: userRequest.email })

        if (emailInUse) return res.status(406).send("Invalid email.")

        const insertUser = await db.collection("users").insertOne({ ...userRequest })

        if (insertUser.acknowleged) return res.status(201).send("User was created sucessfully!.")

        return res.sendStatus(200)

    } catch (err) {
        console.log(err);

        if (err.isJoi) return res.sendStatus(422)

        return res.sendStatus(500)
    }
}
