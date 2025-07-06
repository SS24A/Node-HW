const { client } = require("./DB")

const { ObjectId } = require("mongodb")

const booksModel = client.db("HW3").collection("books")

const getAll = async () => {
    try {
        const books = await booksModel.find().toArray()
        console.log(books)
        return books
    } catch (err) {
        console.log(err)
    }
}

const getOne = async (id) => {
    try {
        const book = await booksModel.findOne({ _id: new ObjectId(id) })
        console.log(book)
        return book
    } catch (err) {
        console.log(err)
    }
}

const addOne = async (data) => {
    try {
        const result = await booksModel.insertOne(data)
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

const updateOne = async (id, data) => {
    try {
        const result = await booksModel.updateOne({ _id: new ObjectId(id) }, { $set: data })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

const deleteOne = async (id) => {
    try {
        const result = await booksModel.deleteOne({ _id: new ObjectId(id) })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne }