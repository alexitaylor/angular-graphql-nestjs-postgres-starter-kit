import Sequelize from 'sequelize';

let db, dbUser, dbPassword, dbHost, dbPort;
if (process.env.NODE_ENV === 'production') {
  db = process.env.DATABASE;
  dbUser = process.env.DATABASE_USER;
  dbPassword = process.env.DATABASE_PASSWORD;
  dbHost = process.env.DATABASE_HOST;
  dbPort = process.env.PORT;
} else {
  db = process.env.TEST_DATABASE || process.env.DATABASE_DEV;
  dbUser = process.env.DATABASE_USER_DEV;
  dbPassword = process.env.DATABASE_PASSWORD_DEV;
  dbHost = process.env.DATABASE_HOST_DEV;
  dbPort = process.env.DATABASE_PORT_DEV;
}

const sequelize = new Sequelize(
  db,
  dbUser,
  dbPassword, {
    dialect: 'postgres',
    host: dbHost,
    port: dbPort
  }
);

// const sequelize = new Sequelize(
//   'postgresql://postgres:pass@postgres:5432'
// );

const models = {
  User: sequelize.import('./users.model'),
  Message: sequelize.import('./messages.model'),
  Role: sequelize.import('./roles.model'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
