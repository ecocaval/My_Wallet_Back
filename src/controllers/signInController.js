//* Libraries
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
//* Schemas
import { UserLoginSchema } from "../schemas/UserSchema.js"
//* Configuration
import db from "../config/dabaBaseConnection.js"
//* functions
import sanitizeInfo from "../validations/sanitizeInfo.js"

export async function logUserIn(req, res) {

    try {
        const userLoginRequest = await UserLoginSchema.validateAsync(sanitizeInfo(req.body), { abortEarly: false })

        const user = await db.collection("users").findOne({ email: userLoginRequest.email })

        if (!user) return res.status(404)

        const PasswordIsCorrect = bcrypt.compareSync(userLoginRequest.password, user.password)

        if (!PasswordIsCorrect) return res.sendStatus(400)

        const userHasToken = await db.collection("tokens").findOne({ userId: user._id })

        if(!userHasToken) {
            
            const token = uuidv4()

            const request = {
                userId: user._id,
                token: token
            }

            const insertToken = await db.collection("tokens").insertOne({
                ...request, tokenDate: Date.now()
            })
    
            console.log(insertToken);

            return res.status(200).send(`Bearer ${token}`)
        }

        return res.sendStatus(200)

    } catch (err) {

        if (err.isJoi) return res.sendStatus(422)

        console.log(err);

        return res.sendStatus(500)
    }
}