module.exports = {
  development: {
    username: 'postgres',
    password: '',
    database: 'faaesk',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    // Store executed migration files to the database
    migrationStorageTableName: 'sequelize_meta',
    // Store executed seeder files to the database
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data'
  },
  production: {
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data'
  }
};
