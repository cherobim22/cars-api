// Update with your config settings.
const { attachPaginate } = require('knex-paginate');

attachPaginate();

module.exports = {
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host : '127.0.0.1',
  //     port : '3306',
  //     user : 'cherobim',
  //     password : 'cherobim',
  //     database : 'cars_api'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   }
  // }
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  }

};
