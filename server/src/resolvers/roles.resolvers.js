export default {
  Query: {
    roles: async (parent, args, { models }) => {
      return await models.Role.findAll();
    }
  }
}
