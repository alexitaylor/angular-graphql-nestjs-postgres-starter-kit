import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!

    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String
    email: String!
    role: String
    messages: [Message!]
  }
`;
