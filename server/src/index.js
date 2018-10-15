import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

// CORS is needed when performing HTTP request from another domain than your server domain to your server.
// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.
app.use(cors());


// Extract HTTP header for the authorization from incoming HTTP request
// If HTTP header then fn verifies the token is valid or not expired.
// Else fn continues with request.
const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
};

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
  context: async ({ req }) => {
    // Injecting the me user, which is the authenticated user from the token,
    // with every request to your Apollo Server’s context.
    // The me user is the user which you encode in the token in your createToken() fn.
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
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
      email: 'ataylor@localhost.com',
      role: 'ADMIN',
      password: '12345678',
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
      email: 'ddavids@localhost.com',
      role: 'USER',
      password: '12345678',
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

  await models.Role.create(
    {
      name: 'ADMIN'
    },
  );

  await models.Role.create(
    {
      name: 'USER'
    },
  );
};
