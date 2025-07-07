const { client } = require("../DB")
const booksModel = client.db("HW3").collection("books")
const { ObjectId } = require("mongodb")


const getAll = async () => {
    try {
        const books = await booksModel.find().toArray()
        return books
    } catch (err) {
        console.log(err)
    }
}

const getOne = async (id) => {
    try {
        const book = await booksModel.findOne({ _id: new ObjectId(id) })
        return book
    } catch (err) {
        console.log(err)
    }
}

const addOne = async (data) => {
    try {
        const result = await booksModel.insertOne(data)
        return { ...data, _id: result.insertedId }
    } catch (err) {
        console.log(err)
    }
}

const updateOne = async (id, data) => {
    try {
        const result = await booksModel.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data })
        return result
    } catch (err) {
        console.log(err)
    }
}

const deleteOne = async (id) => {
    try {
        const result = await booksModel.findOneAndDelete({ _id: new ObjectId(id) })
        return result
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne }
