import { gql } from 'apollo-server-express';

import userSchema from './users.schema';
import messageSchema from './messages.schema';


// Both schemas are merged together with the help of a utility linkSchema.
// The linkSchema defines all types which are shared within the schemas.
const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
