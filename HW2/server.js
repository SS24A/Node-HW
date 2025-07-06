const express = require("express")
const app = express()
const port = 8083

const { getAllUsers, getOneUser, addUser, updateUser, deleteUser } = require('./controllers')

app.use(express.json())

app.get("/users", getAllUsers)
app.get("/users/:id", getOneUser)
app.post("/users", addUser)
app.put("/users/:id", updateUser)
app.delete("/users/:id", deleteUser)

app.use((req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, (err) => {
    if (err) {
        return console.log("Error, the server cannot be started", err)
    }
    console.log(`Server started listening on port ${port}`)
})