import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import http from 'http';

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
      throw new AuthenticationError('Your session expired. Sign in again.');
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
  // So that the me users is retrieved from the db with every request
  context: async ({ req, connection }) => {
    // Distinguish between Subscription
    // Subscription comes with a connection object
    if (connection) {
      return {
        models,
      };
    }

    // Or HTTP requests (GraphQL mutations and queries)
    // HTTP requests come with a req and res object
    if (req) {
      // Injecting the me users, which is the authenticated users from the token,
      // with every request to your Apollo Server’s context.
      // The me users is the users which you encode in the token in your createToken() fn.
      const me = await getMe(req);
      return {
        models,
        me,
        secret: process.env.SECRET,
      };
    }
  },
});

// Add Express middleware and specify the path for your GraphQL API endpoint
server.applyMiddleware({ app, path: '/graphql' });

// Server Subscription Setup
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;

sequelize.sync({ force: false }).then(async () => {
  if (false) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen({ port }, () => {
    console.log(`🚀  🚀   🚀   🚀 Apollo Server on http://localhost:${port}/graphql`);
  });
}).catch(err => {
  console.log('err: ', err);
});

const createUsersWithMessages = async date => {

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

  await models.User.create(
    {
      firstName: 'Admin',
      lastName: 'Admin',
      username: 'admin',
      email: 'admin@localhost.com',
      password: '12345678',
      roleId: 1,
      messages: [
        {
          text: 'Hello World',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      firstName: 'User',
      lastName: 'User',
      username: 'user',
      email: 'ccollins@localhost.com',
      password: '12345678',
      roleId: 2,
      messages: [
        {
          text: 'Hello World!',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Good bye...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
