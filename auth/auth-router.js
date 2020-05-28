const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            return res.status(409).json({
                message: "Username is already taken",
            })
        }

        res.status(201).json(await Users.add(req.body))
    } catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "You shall not pass!",
    }

    try {
        const user = await Users.findBy({ username: req.body.username }).first()
        if (!user) {
            return res.status(401).json(authError)
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValid) {
            return res.status(401).json(authError)
        }


        const tokenPayload = {
            userId: user.id,
            userRole: "admin",
        }

        res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))

        res.json({
            message: `Welcome ${user.username}!`,
        })
    } catch (err) {
        next(err)
    }
})



module.exports = router