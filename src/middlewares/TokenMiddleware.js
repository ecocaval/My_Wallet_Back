//* Libraries
import { ObjectId } from "mongodb"
//* Config
import db from "../config/dabaBaseConnection.js"

export async function validateToken(req, res, next) {
    
    const { authorization } = req.headers

    const userId = ObjectId(req.params.id)

    if(!authorization) return res.sendStatus(401)

    const token = authorization.replace("Bearer ", "")

    try {

        const tokenInDb = await db.collection("tokens").findOne({ userId })

        if (tokenInDb?.token !== token) return res.sendStatus(401)

    } catch (err) {

        console.error(err)

        return res.sendStatus(500)
    }    
    next()
}