//* Libraries
import { ObjectId } from "mongodb";
//* Configuration
import db from "../config/dabaBaseConnection.js";

export async function getUserTransactions(req, res) {

    const userId = req.params.id

    try {
        const userExists = await db.collection("users").findOne({ _id: ObjectId(userId) })
        if (!userExists) return res.sendStatus(401)

        const userTransactions = await db.collection("transactions").find({ userId }).toArray()

        if(userTransactions.length === 0) return res.sendStatus(404)
        return res.send(userTransactions)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function insertTransaction(req, res) {

    const transaction = req.sanitizedBody
    const userId = req.params.id

    try {
        await db.collection("transactions").insertOne({
            ...transaction, userId
        })
        return res.sendStatus(201)
    } catch (err) {     
        console.error(err)   
        return res.sendStatus(500)
    }
}