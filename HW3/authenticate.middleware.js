const jwt = require('jsonwebtoken');

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
    } else {
        next()
    }
}

module.exports = checkRole