exports.up = function (knex) {
  return knex.schema.createTable("brands", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("origin").notNullable();
    table.boolean("status").notNullable().defaultTo(true);
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("brands");
};
