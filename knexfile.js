// Update with your config settings.
const { attachPaginate } = require('knex-paginate');

attachPaginate();

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './src/database/db.sqlite3'
  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   },
  //   useNullAsDefault: true,
  // },
  development:{
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'cherobim',
      password : 'cherobim',
      database : 'projects'
    },
    migrations: {
      directory: 'src/database/migrations'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
