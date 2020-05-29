
exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments()
        table.string("username").notNullable().unique()
        table.string("password").notNullable()
        table.string("phoneNumber").notNullable()
    })


    await knex.schema.createTable("plants", table => {
        table.increments()
        table.string("nickname").notNullable()
        table.string("species").notNullable()
        table.string("h2oFrequency").notNullable()
        table.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")
}