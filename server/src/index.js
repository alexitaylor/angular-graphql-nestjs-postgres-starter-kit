import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

// CORS is needed when performing HTTP request from another domain than your server domain to your server.
// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  }
});

// Add Express middleware and specify the path for your GraphQL API endpoint
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('🚀🚀🚀 Apollo Server on http://localhost:8000/graphql');
});
