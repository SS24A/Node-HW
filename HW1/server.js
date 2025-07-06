const fs = require("fs")
const http = require("http")

const port = 8080

const server = http.createServer((req, res) => {
    fs.readFile(`./Dog_breeds${req.url}.html`, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(404, { "content-type": "text/html" })
            res.write("Page not found")
            res.end()
        } else {
            res.writeHead(200, { "content-type": "text/html" })
            res.write(data)
            res.end()
        }
    })

})

server.listen(port, (err) => {
    if (err) {
        console.log("Error, the server is not started") //
        return
    }
    console.log(`Server started listening on port ${port}`)
})