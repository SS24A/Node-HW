let users = []

const getAll = () => {
    return users
}

const getOne = (id) => {
    const user = users.find(user => user.email === id)
    if (!user) return null
    return user
}

const addOne = (userData) => {
    users.push(userData)
    return userData
}

const updateOne = (id, userData) => {
    const user = users.find(user => user.email === id)
    if (!user) {
        return null
    }
    users = users.map(user => {
        if (user.email === id) {
            return { ...user, ...userData }
        } else {
            return user
        }
    })
    return { ...user, ...userData }
}

const deleteOne = (id) => {
    const user = users.find(user => user.email === id)
    if (!user) {
        return null
    }
    users = users.filter(user => user.email !== id)
    return user
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne }