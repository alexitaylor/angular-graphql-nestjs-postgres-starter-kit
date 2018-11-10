import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import Sequelize from 'sequelize';
import pubsub, { EVENTS } from '../subscription';


const toCursorHash = string => Buffer.from(string).toString('base64');
const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

// Resolvers do not need async / await as they would be waiting for the actual result.
// However it is better to be explicit, especially when adding more business logic.
export default {
  Query: {
    messages: async (
      parent,
      { cursor, limit = 100 },
      { models }
     ) => {
      // The following sequelize clause:
      // 1. find all items in a list by the starting property createdAt
      // with less than (lt) values for this property.
      // Finds all messages before this date
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
        : {};

      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      // pageInfo is meta data where we supply it with the date of the last message in the list,
      // for our cursor based pagination.
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    message: async (parent, { id }, { models }) => await models.Message.findById(id),
  },

  Mutation: {
    // isAuthenticated runs before the actual resolver
    // that creates the message associated with the authenticated user in the db
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),

    // Can stack protecting resolver (resolver guards) on top of each other.
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),

    updateMessage: async (parent, { id, text }, { models }) => {
      return await models.Message.update({ text, where: { id }})
    },

  },

  Message: {
    user: async (message, args, { models }) => await models.User.findById(message.userId),
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
