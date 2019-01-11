import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.PORT
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
