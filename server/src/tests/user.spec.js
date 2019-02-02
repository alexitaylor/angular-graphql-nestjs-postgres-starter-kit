import { expect } from 'chai';
import * as userApi from './api';

describe('users', () => {
  it('users is users', () => {
    expect('user').to.eql('user');
  });

  describe('users(id: String!): User', () => {
    it('returns a users when users can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            firstName: 'Charlie',
            lastName: 'Wallie',
            username: '@CWallie',
            email: 'cwallie@localhost.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when users cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await userApi.user({ id: '42' });

      expect(result.data).to.eql(expectedResult);
    });

  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a users', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'ccollins',
        password: '12345678',
      });

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '1' }, token);

      expect(errors[0].message).to.eql('Not authorized as admin.');
    });

    it('deletes a users because only admins can delete a users', async ( ) => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'cwallie',
        password: '12345678',
      });

      const {
        data: {
          data: {
            deleteUser
          }
        }
      } = await userApi.deleteUser({ id: '2' }, token);

      expect(deleteUser).to.equal(true);
    });
  });

});
