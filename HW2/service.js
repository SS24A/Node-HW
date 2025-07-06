let users = []

const getAll = () => {
    return users
}

const getOne = (id) => {
    const user = users.find(user => user.email === id)
    return user
}

const addOne = (userData) => {
    users.push(userData)
    return userData
}

const updateOne = (id, userData) => {
    users = users.map(user => {
        if (user.email === id) {
            return { ...user, ...userData }
        } else {
            return user
        }
    })
}

const deleteOne = (id) => {
    users = users.filter(user => user.email !== id)
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne }