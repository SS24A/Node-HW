const { client } = require("../DB")
const usersModel = client.db("HW3").collection("users")

const registerDB = async (data) => {
    try {
        const user = await usersModel.insertOne(data)
        return { ...data, _id: user.insertedId }
    } catch (err) {
        console.log(err)
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await usersModel.findOne({ email })
        return user
    } catch (err) {
        console.log(err)
    }
}

module.exports = { registerDB, getUserByEmail }
