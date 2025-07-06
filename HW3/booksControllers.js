const express = require("express")
const jwt = require('jsonwebtoken');

const { getAll, getOne, addOne, updateOne, deleteOne } = require("./booksService")

const booksRouter = express.Router()

const getAllBooks = async (req, res) => {
    try {
        const books = await getAll()
        res.status(200).json(books)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getOneBook = async (req, res) => {
    try {
        const book = await getOne(req.params.id)
        res.status(200).json(book)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const addBook = async (req, res) => {
    const { title, author, year } = req.body
    try {
        if (!title || !author || !year) {
            return res.status(400).json({ error: "title, author and year are required informations" })
        }
        const result = await addOne({ title, author, year })
        res.status(201).json({ _id: result.insertedId, title, author, year })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateBook = async (req, res) => {
    try {
        const result = await updateOne(req.params.id, req.body)
        console.log(result, "in handler")
        res.status(200).json({ message: "book updated" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteBook = async (req, res) => {
    try {
        const result = await deleteOne(req.params.id)
        console.log(result, "in handler")
        res.status(200).json({ message: "book deleted" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const checkRole = (req, res, next) => {
    if (req.method !== "GET") {
        if (req.headers && req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET, function (err, decoded) {
                if (err) {
                    return res.status(400).json({ error: err })
                }
                if (decoded.role !== "admin") {
                    return res.status(404).json({ message: "No permission" })
                }
                next()
            })
        } else {
            return res.status(404).json({ message: "No permission" })
        }
    }
}

booksRouter.get("/", getAllBooks)
booksRouter.get("/:id", getOneBook)

booksRouter.post("/", checkRole, addBook)
booksRouter.put("/:id", checkRole, updateBook)
booksRouter.delete("/:id", checkRole, deleteBook)

module.exports = booksRouter