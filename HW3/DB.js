const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.URI)
// let booksModel = null
// let usersModel = null

async function connectToDB() {
    try {
        await client.connect()
        console.log("Connected to Mongo DB")
        // booksModel = client.db("HW3").collection("books")
        // usersModel = client.db("HW3").collection("users")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { client, connectToDB }