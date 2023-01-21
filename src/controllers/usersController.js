//* Libraries
import { ObjectId } from "mongodb"
//* Configuration
import db from "../config/dabaBaseConnection.js"

export async function getUsers(req, res) {
    try {
        let users = await db.collection("users").find().toArray()
        return res.status(200).send(users)

    } catch (err) {        
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function getUserById(req, res) {
    try {
        const userId = ObjectId(req.params.id)

        const userInDb = await db.collection("users").findOne({ _id: userId })
        if (!userInDb) return res.status(404).send("User not found.")

        return res.status(200).send(userInDb)

    } catch (err) {           
        console.error(err)     
        return res.sendStatus(500)
    }
}

export async function updateUser(req, res) {

    const userId = ObjectId(req.params.id)

    try {

        const userInDb = await db.collection("users").findOne({ _id: userId })
        if (!userInDb) return res.status(404).send("User not found.")

        const userUpdateRequest = req.sanitizedBody
        if (Object.entries(userUpdateRequest).length === 0) return res.sendStatus(422)

        const userUpdate = await db.collection("users").updateOne({ _id: userId }, {
            $set: { ...userUpdateRequest }
        })

        if (!userUpdate.acknowledged) throw new Error

        return res.sendStatus(200)

    } catch (err) {        
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function deleteUser(req, res) {

    const userId = ObjectId(req.params.id)

    try {
        const userInDb = await db.collection("users").findOne({ _id: userId })
        if (!userInDb) return res.status(404).send("User not found.")

        const userWasDeleted = await db.collection("users").deleteOne({ _id: userId })

        if (!(userWasDeleted.deletedCount === 1)) throw new Error
        return res.sendStatus(200)

    } catch (err) {       
        console.error(err) 
        return res.sendStatus(500)
    }
}