// Resolvers do not need async / await as they would be waiting for the actual result.
// However it is better to be explicit, especially when adding more business logic.
export default {
  Query: {
    messages: async (parent, args, { models }) => await models.Message.findAll(),
    message: async (parent, { id }, { models }) => await models.Message.findById(id),
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      return await models.Message.create({
        text,
        userId: me.id,
      })
    },
    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id }})
    },
    updateMessage: async (parent, { id, text }, { models }) => {
      return await models.Message.update({ text, where: { id }})
    }
  },

  Message: {
    user: async (message, args, { models }) => await models.User.findById(message.userId),
  },
};
