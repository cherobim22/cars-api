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
      host : process.env.HOST,
      port : process.env.PORT,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE
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
