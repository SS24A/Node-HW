const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = 8085

const booksRouter = require("./booksControllers")
const usersRouter = require("./usersControllers")
const { connectToDB } = require("./DB")

connectToDB()

app.use(express.json())
app.use("/books", booksRouter)
app.use("/users", usersRouter)

app.listen(port, (err) => {
    if (err) {
        console.log("Error, the server is not started") //
        return
    }
    console.log(`Server started listening on port ${port}`)
})