import { gql } from 'apollo-server-express';

// PageInfo type is an intermediate layer which holds meta info;
// here we introduce endCursor (createdAt of the last message in the list).
export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }
  
  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message!
  }
  
  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }
  
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
  
  type Message {
    id: ID!
    text: String!
    createdAt: String!
    user: User! 
  }
  
  extend type Subscription {
    messageCreated: MessageCreated!
  }
  
  type MessageCreated {
    message: Message!
    messages: MessageConnection!
  }
`;
