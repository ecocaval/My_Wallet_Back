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

        if (userTransactions.length === 0) return res.send([])
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

export async function updateTransaction(req, res) {

    const transactionId = req.params.transactionId
    const transactionUpdated = req.sanitizedBody

    try {
        const transaction = await db.collection("transactions").updateOne({ _id: ObjectId(transactionId) },
            {
                $set: {
                    ...transactionUpdated
                }
            }
        )
        if(transaction.modifiedCount !== 1) return res.sendStatus(204) // message sent when the user content is not modified
        return res.sendStatus(200)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function deleteTransaction(req, res) {

    const transactionId = req.params.transactionId

    try {
        const deleted = await db.collection("transactions").deleteOne({ _id: ObjectId(transactionId) })

        if (deleted.deletedCount === 0) return res.sendStatus(404)

        return res.sendStatus(200)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}