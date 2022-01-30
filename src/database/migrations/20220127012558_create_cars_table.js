
exports.up = function(knex) {
    return knex.schema.createTable("cars", function (table) {
        table.increments();
        table.string("name").notNullable();
        table.integer('year').notNullable();
        table.double('price').notNullable();
        table.string('fuel').notNullable();
        table.integer('brand_id').unsigned().index().references('id').inTable('brands');
        table.timestamp("created_at").defaultTo(Date.now());
        table.timestamp("updated_at");
        table.timestamp("deleted_at");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("cars");
};
