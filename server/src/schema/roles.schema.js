import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    roles: [Role!]
  }
  
  type Role {
    id: ID!
    name: String!
  }
`;
