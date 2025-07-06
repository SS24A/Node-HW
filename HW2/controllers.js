const usersService = require("./service")

const getAllUsers = (req, res) => {
    const users = usersService.getAll()
    res.status(200).json(users)
}

const getOneUser = (req, res) => {
    const user = usersService.getOne(req.params.id)
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
}

const addUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    const userExists = usersService.getOne(email)
    if (userExists) {
        return res.status(400).json({ error: "User with that email already exists." })
    }

    if (password.length < 6 || password.length > 10) {
        return res.status(400).json({ error: "Invalid password, 6-10 chars required." })
    }

    const user = usersService.addOne({ email, password })
    res.status(201).json(user)
}

const updateUser = (req, res) => {
    const { email, password } = req.body

    const user = usersService.getOne(req.params.id)
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }

    const userExists = email ? usersService.getOne(email) : null
    if (userExists) {
        return res.status(400).json({ error: "The email cannot be updated to the new value since user with that email already exists." })
    }

    if (password && (password.length < 6 || password.length > 10)) {
        return res.status(400).json({ error: "Invalid password, 6-10 chars required." })
    }

    const updateObj = {}
    if (email) updateObj.email = email
    if (password) updateObj.password = password

    const updatedUser = usersService.updateOne(req.params.id, updateObj)
    res.status(200).json({ message: `User updated: ${updatedUser}` })
}

const deleteUser = (req, res) => {
    const deletedUser = usersService.deleteOne(req.params.id)
    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json({ message: `User deleted: ${deletedUser}` })
}

module.exports = { getAllUsers, getOneUser, addUser, updateUser, deleteUser }
