exports.up = function(knex) {
    return knex.schema.table('cars', table => {
      table.integer('motors_id').unsigned().index().references('id').inTable('brands').defaultTo(0);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('cars', table => {
      table.dropColumn('motors_id');
    })
  };