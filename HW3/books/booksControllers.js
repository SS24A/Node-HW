const express = require("express")

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
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
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
            return res.status(400).json({ error: "Incomplete data: Title, Author and Year are required informations" })
        }
        const newBook = await addOne({ title, author, year })
        res.status(201).json(newBook)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateBook = async (req, res) => {
    const { title, author, year } = req.body
    const updateObj = {}
    if (title) updateObj.title = title
    if (author) updateObj.author = author
    if (year) updateObj.year = year

    try {
        const result = await updateOne(req.params.id, updateObj)
        if (!result) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ updatedBook: { ...result, ...updateObj } })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await deleteOne(req.params.id)
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ deletedBook })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

booksRouter.get("/", getAllBooks)
booksRouter.get("/:id", getOneBook)
booksRouter.post("/", addBook)
booksRouter.put("/:id", updateBook)
booksRouter.delete("/:id", deleteBook)

module.exports = booksRouter
