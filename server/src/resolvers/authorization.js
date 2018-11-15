import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

// Acts as a middleware
// If me user is available continues with the next resolver (skip) else returns an error.
// Since it's a resolver fn as same args as resolver
export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => {
    return role === 'ADMIN'
      ? skip :
      new ForbiddenError('Not authorized as admin.')
  }
);


// Resolver checks whether the authenticated user is a message owner.
// It’s the perfect check before deleting a message if only the message creator should be able to delete it.
// The guarding resolver retrieves the message by id, checks the message’s associated user with
// the authenticated user, and either throws an error or continues with the next resolver.
export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
