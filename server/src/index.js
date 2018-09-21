import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

// CORS is needed when performing HTTP request from another domain than your server domain to your server.
// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  // context fn: returns the context object rather than an object for the context in Apollo Server.
  // the async / await fn is invoked on every request hitting the GraphQlL API
  // So that the me user is retrieved from the db with every request
  context: async () => ({
    models,
    me: await models.User.findByLogin('ataylor'),
  }),
});

// Add Express middleware and specify the path for your GraphQL API endpoint
server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.PORT || 8000;
// TODO remove later on
const eraseDatabaseOnSync = true;

// TODO remove force flag (seeds the database on every application startup
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen({ port }, () => {
    console.log('🚀  🚀   🚀 Apollo Server on http://localhost:8000/graphql');
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      firstName: 'Alexi',
      lastName: 'Taylor',
      username: 'ataylor',
      messages: [
        {
          text: 'Hello World',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      firstName: 'Dave',
      lastName: 'Davids',
      username: 'ddavids',
      messages: [
        {
          text: 'Hello World!',
        },
        {
          text: 'Good bye...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
