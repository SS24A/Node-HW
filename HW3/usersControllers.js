const express = require("express")
const jwt = require('jsonwebtoken');

const { registerDB, getUserByEmail } = require("./usersService")

const usersRouter = express.Router()

const register = async (req, res) => {
    let { username, email, password, role } = req.body
    if (!role) role = "user"
    if (role !== "user" && role !== "admin") role = "user"
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: "username, email and password are required informations" })
        }
        const userExists = await getUserByEmail(email)
        if (userExists) {
            return res.status(400).json({ error: "user with that email already exists" })
        }
        const result = await registerDB({ username, email, password, role })
        res.status(201).json({ _id: result.insertedId, username, email, password, role })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}


const login = async (req, res) => {
    let { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required informations" })
        }

        const userExists = await getUserByEmail(email)
        if (!userExists) {
            return res.status(400).json({ error: "User not found" })
        }
        if (password !== userExists.password) {
            return res.status(400).json({ error: "Incorrect password" })
        }
        const token = jwt.sign({ username: userExists.username, email, role: userExists.role }, process.env.SECRET, { expiresIn: "7d" }); //id od DB namesto email?
        res.status(201).json({ token: token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

usersRouter.post("/register", register)
usersRouter.post("/login", login)

module.exports = usersRouter