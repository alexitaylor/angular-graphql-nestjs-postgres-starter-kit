import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

// Acts as a middleware
// If me users is available continues with the next resolver (skip) else returns an error.
// Since it's a resolver fn as same args as resolver
export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as users.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => {
    return role.name === 'ADMIN'
      ? skip :
      new ForbiddenError('Not authorized as admin.')
  }
);


// Resolver checks whether the authenticated users is a message owner.
// It’s the perfect check before deleting a message if only the message creator should be able to delete it.
// The guarding resolver retrieves the message by id, checks the message’s associated users with
// the authenticated users, and either throws an error or continues with the next resolver.
export const isMessageOwnerOrAdmin = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (me.role.name === 'ADMIN') {
    return skip;
  } else if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
