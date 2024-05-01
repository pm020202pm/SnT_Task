import { tokenDb } from "../model/db.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.body.token
    try {
        const admin = await tokenDb(token)
        req.body.admin = admin;
        if (!req.body.admin) {
            res.status(500).send("You are not authorized")
            next(new Error("You are not authorized"))
        }
        next()
    } catch (error) {
        res.status(500).send("You are not authorized")
    }
}