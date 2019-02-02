import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { AuthenticationError, UserInputError } from "apollo-server";
import { isAdmin } from "./authorization";
// Resolvers do not need async / await as they would be waiting for the actual result.
// However it is better to be explicit, especially when adding more business logic.

// In order to secure toke, pass in secret which is only available
// between you and your server.
// Token only valid for 30min
const createToken = async (user, secret, expiresIn, models) => {
  const { id, email, username, roleId } = user;
  const role = await models.Role.findById(roleId);
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  });
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { firstName, lastName, email, username, password },
      { models, secret }
    ) => {
      const user = await models.User.create({
        firstName,
        lastName,
        username,
        email,
        roleId: 2,
        password
      });

      // Expires in 30 min
      return { token: createToken(user, secret, "1800000", models) };
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No users found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      // Expires in 30 min
      return { token: createToken(user, secret, "1800000", models) };
    },

    createUser: combineResolvers(
      isAdmin,
      async (
        parent,
        { firstName, lastName, email, username, roleId },
        { models }
      ) => {
        // TODO generate random password
        const password = '12345678';
        const user = await models.User.create({
          firstName,
          lastName,
          username,
          email,
          roleId,
          password
        });

        return user;
      }
    ),

    updateUser: combineResolvers(
      isAdmin,
      async (
        parent,
        { id, firstName, lastName, email, username, roleId },
        { models }
      ) => {
        const res = await models.User.update({
          firstName,
          lastName,
          username,
          email,
          roleId,
        }, {
          where: { id },
          // Return the updated object
          returning: true,
          // Return the object itself and no meta data
          plain: true,
        });

        const user = res[1].dataValues;

        return user;
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id }
        });
      }
    ),
  },

  User: {
    // username: users => {
    //   return `@${users.firstName[0]}${users.lastName}`;
    // },
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    },
    role: async (user, args, { models }) => await models.Role.findById(user.roleId),
  }
};
