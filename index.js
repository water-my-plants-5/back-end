
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const plantsRouter = require("./plants/plants-router");
const server = express()
const port = process.env.PORT || 5000


server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


server.use("/auth", authRouter)
server.use("/users", usersRouter) // added restrict after testing in insomnia. Go here first if problems
server.use("/plants", plantsRouter);

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

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

module.exports = server