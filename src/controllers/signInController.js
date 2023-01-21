//* Libraries
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
//* Configuration
import db from "../config/dabaBaseConnection.js"

export async function logUserIn(req, res) {
    try {
        const userLoginRequest = req.sanitizedBody

        const user = await db.collection("users").findOne({ email: userLoginRequest.email })
        if (!user) return res.sendStatus(404)

        const PasswordIsCorrect = bcrypt.compareSync(userLoginRequest.password, user.password)
        if (!PasswordIsCorrect) return res.sendStatus(400)

        const userHasToken = await db.collection("tokens").findOne({ userId: user._id })
        if (!userHasToken) {

            const token = uuidv4()

            const request = {
                userId: user._id,
                token: token
            }

            const insertToken = await db.collection("tokens").insertOne({
                ...request, tokenDate: Date.now()
            })

            if (!(insertToken.acknowledged === true)) throw new Error            
            
            return res.status(200).send({
                userId: user._id,
                token: `Bearer ${token}`
            })
        }

        return res.status(200).send({
            userId: user._id,
            token: `Bearer ${userHasToken.token}`
        })

    } catch (err) {        
        console.error(err)
        return res.sendStatus(500)
    }
}