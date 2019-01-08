import {combineResolvers, skip} from 'graphql-resolvers';
import {isAdmin} from './authorization';
import { ForbiddenError } from 'apollo-server';

export const canDeleteRole =
  async (parent, { id }, { models }) => {
    const users = await models.User.find({
      where: { roleId: id }
    });
    console.log('users: ', users);
    return !users
      ? skip :
      new ForbiddenError('Unable to delete role. Associations found in User table.')
  };

export default {
  Query: {
    roles: async (parent, args, { models }) => {
      return await models.Role.findAll();
    },

    role: async (parent, { id }, { models }) => {
      return await models.Role.findById(id);
    }
  },

  Mutation: {
    createRole: combineResolvers(
      isAdmin,
      async (
        parent,
        { name },
        { models }
      ) => {
        const role = await models.Role.create({
          name
        });

        return role;
      }
    ),

    updateRole: combineResolvers(
      isAdmin,
      async (
        parent,
        { id, name },
        { models }
      ) => {
        const res = await models.Role.update({
          name
        }, {
          where: { id },
          // Return the updated object
          returning: true,
          // Return the object itself and no meta data
          plain: true,
        });

        const role = res[1].dataValues;

        return role;
      }
    ),

    deleteRole: combineResolvers(
      isAdmin,
      canDeleteRole,
      async (
        parent,
        { id },
        { models }
      ) => {
        return await models.Role.destroy({
          where: { id }
        });
      }
    ),
  }
}
