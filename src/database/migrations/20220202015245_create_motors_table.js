
exports.up = function(knex) {
    return knex.schema.createTable("motors", function (table) {
        table.increments();
        table.string("code").notNullable();
        table.integer('position').notNullable();
        table.double('cylinders').notNullable();
        table.string('torque').notNullable();
        table.string('hp').notNullable();
        table.integer('brand_id').unsigned().index().references('id').inTable('brands');
        table.timestamp("created_at");
        table.timestamp("updated_at");
        table.timestamp("deleted_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("motors");
};
