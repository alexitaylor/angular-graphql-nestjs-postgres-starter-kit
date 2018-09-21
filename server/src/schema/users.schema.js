import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  
  type User {
    id: ID!
    name: String!
    username: String
    messages: [Message!]
  }
`;
