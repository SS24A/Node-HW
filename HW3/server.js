const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = 8085

const booksRouter = require("./books/booksControllers")
const usersRouter = require("./users/usersControllers")
const authenticate = require("./authenticate.middleware")

const { connectToDB } = require("./DB")
connectToDB()

app.use(express.json())

app.use("/users", usersRouter)
app.use(authenticate)
app.use("/books", booksRouter)

app.use((req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, (err) => {
    if (err) {
        return console.log("Error, the server cannot be started", err)
    }
    console.log(`Server started listening on port ${port}`)
})