const express = require("express");
const helmet = require("helmet");
const Plants = require("./plants-model.js");
const router = express.Router();


router.get("/", (req, res) => {
    Plants.find()
        .then(plants => {
            res.json(plants);
        })
        .catch(error => {
            res.status(500).json({ message: "Could not get plants." });
        });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    Plants.findById(id)
        .then(plant => {
            if (plant) {
                res.json(plant);
            } else {
                res
                    .status(404)
                    .json({ message: "Could not find plant with that ID." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});



router.post("/", (req, res) => {
    const plantData = req.body;

    Plants.add(plantData)
        .then(plant => {
            res.status(201).json(plant);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});



router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Plants.findById(id)
        .then(plant => {
            if (plant) {
                Plants.update(changes, id).then(updatedPlant => {
                    res.json(updatedPlant);
                });
            } else {
                res
                    .status(404)
                    .json({ message: "Could not find plant with that Id." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});



router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Plants.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res
                    .status(404)
                    .json({ message: "Could not find plant with that Id." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        });
});


module.exports = router;