



const db = require("../database/config");


function getResources() {
    return db("plants");
}


function getById(id) {
    return db("plants")
        .where({ id })
        .first();
}


function add(plant) {
    return db("plants")
        .insert(plant)
        .then(ids => {
            return getById(ids[0]);
        });
}


function update(changes, id) {
    return db("plants")
        .where({ id })
        .update(changes)
        .then(count => {
            return findById(id);
        });
}


function remove(id) {
    return db("plants")
        .where({ id })
        .del();
}


module.exports = {
    getResources,
    getById,
    add,
    update,
    remove
};