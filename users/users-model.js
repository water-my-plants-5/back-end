




const bcrypt = require("bcryptjs")
const db = require("../database/config")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)

    const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username", "phoneNumber")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first()
}

function update(changes, id) {
    return db("users")
        .where({ id })
        .update(changes)
        .then(count => {
            return findById(id);
        });
}

function remove(id) {
    return db("users")
        .where({ id })
        .del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}