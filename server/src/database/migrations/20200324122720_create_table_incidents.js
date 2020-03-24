exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('id_ngo').notNullable();
        table.foreign('id_ngo').references('id').inTable('ngos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
