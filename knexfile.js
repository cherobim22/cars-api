// Update with your config settings.
const { attachPaginate } = require('knex-paginate');

attachPaginate();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      port : process.env.PORT,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './src/database/db.sqlite3'
  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   },
  //   useNullAsDefault: true,
  // }

};
