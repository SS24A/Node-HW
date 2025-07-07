const express = require("express")
const jwt = require('jsonwebtoken');

const { registerDB, getUserByEmail } = require("./usersService")

const usersRouter = express.Router()

const register = async (req, res) => {
    let { username, email, password, role } = req.body
    if (!role || !["user", "admin"].includes(role)) role = "user"

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, Email and Password are required informations" })
        }
        const userExists = await getUserByEmail(email)
        if (userExists) {
            return res.status(400).json({ error: "User with that email already exists" })
        }
        const newUser = await registerDB({ username, email, password, role })
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required informations" })
        }

        const userExists = await getUserByEmail(email)
        if (!userExists || password !== userExists.password) {
            return res.status(400).json({ error: "Incorrect email or password" })
        }

        const token = jwt.sign({ username: userExists.username, email, role: userExists.role, _id: userExists._id }, process.env.SECRET, { expiresIn: "7d" });
        res.status(201).json({ token: token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

usersRouter.post("/register", register)
usersRouter.post("/login", login)

module.exports = usersRouter




