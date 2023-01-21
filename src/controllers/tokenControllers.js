//* Configuration
import db from "../config/dabaBaseConnection.js"

export async function getTokens(req, res) {
    try {        
        const tokens = await db.collection("tokens").find().toArray()
        return res.send(tokens)
    } catch (err) {       
        console.error(err)
        return res.sendStatus(500)        
    }    
}