

const express = require('express');
const plant = require("./plants-model");
const router = express.Router();

router.get('/', (req, res) => {
    plant.getResources()
        .then(plant => {
            res.status(200).json(plant)
        })
        .catch(err => {
            res.status(500).json({ message: 'Cannot get plants' })
        })
})

router.get('/:id', (req, res) => {

    plant.getById(req.params.id)
        .then(plants => {
            if (plants) {
                res.json(plants)
            } else {
                res.status(404).json({ message: 'no plants matching that ID' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'an error has occurred' })
        })
})

router.post('/', (req, res) => {
    plant.add(req.body).then(newPlant => {
        res.status(200).json(newPlant)
    }).catch(err => {
        res.status(500).json({ message: 'an error has occurred' })
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    plant.remove(id).then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'no task matching that ID exists' })
        }
    }).catch(err => {
        res.status(500).json({ message: 'an error has occurred' });
    });
})

module.exports = router;


















// const express = require("express");
// const helmet = require("helmet");
// const Plants = require("./plants-model.js");
// const router = express.Router();


// router.get("/", (req, res) => {
//     Plants.find()
//         .then(plants => {
//             res.json(plants);
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Could not get plants." });
//         });
// });


// router.get("/:id", (req, res) => {
//     const { id } = req.params;
//     Plants.findById(id)
//         .then(plant => {
//             if (plant) {
//                 res.json(plant);
//             } else {
//                 res
//                     .status(404)
//                     .json({ message: "Could not find plant with that ID." });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Server Error" });
//         });
// });



// router.post("/", (req, res) => {
//     const plantData = req.body;

//     Plants.add(plantData)
//         .then(plant => {
//             res.status(201).json(plant);
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Server Error" });
//         });
// });



// router.put("/:id", (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     Plants.findById(id)
//         .then(plant => {
//             if (plant) {
//                 Plants.update(changes, id).then(updatedPlant => {
//                     res.json(updatedPlant);
//                 });
//             } else {
//                 res
//                     .status(404)
//                     .json({ message: "Could not find plant with that Id." });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Server Error" });
//         });
// });



// router.delete("/:id", (req, res) => {
//     const { id } = req.params;

//     Plants.remove(id)
//         .then(deleted => {
//             if (deleted) {
//                 res.json({ removed: deleted });
//             } else {
//                 res
//                     .status(404)
//                     .json({ message: "Could not find plant with that Id." });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Server Error" });
//         });
// });


// module.exports = router;