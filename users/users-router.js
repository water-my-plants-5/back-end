



const express = require("express")
const Users = require("../users/users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()


router.get("/", restrict(), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(error));
});

router.get("/:id", restrict(), (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "Could not find user with that ID." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});

router.post("/", restrict(), (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(user => {
            if (user) {
                Users.update(changes, id).then(updatedUser => {

                    delete updatedUser.password;
                    res.json(updatedUser);
                });
            } else {
                res.status(404).json({ message: "Could not find user with that Id." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({ message: "Could not find user with that Id." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});

module.exports = router;