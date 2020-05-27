const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 5000


server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
    res.json({
        message: "Let's water some plants!",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Server Error",
    })
})


server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})