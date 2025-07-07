const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.URI)

async function connectToDB() {
    try {
        await client.connect()
        console.log("Connected to Mongo DB")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connectToDB, client }