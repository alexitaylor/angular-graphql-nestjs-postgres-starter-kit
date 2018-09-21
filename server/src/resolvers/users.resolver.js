export default {
  Query: {
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    user: (parent, { id }, { models }) => {
      return models.users[id];
    },
    me: (parent, args, { me }) => me,
  },

  User: {
    username: (user) => {
      return `@${user.name.split(' ')[0][0]}${user.name.split(' ')[1]}`;
    },
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id,
      );
    },
  },
};
