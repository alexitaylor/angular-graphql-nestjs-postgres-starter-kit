import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    roles: [Role!]
    role(id: ID!): Role
  }
  
  extend type Mutation {
    createRole(name: String!): Role!
    
    updateRole(id: ID!, name: String!): Role!
    
    deleteRole(id: ID!): Boolean!
  }
  
  type Role {
    id: ID!
    name: String!
  }
`;
