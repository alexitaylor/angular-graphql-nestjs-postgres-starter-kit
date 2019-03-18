import { Connection } from 'typeorm';
import * as faker from 'faker';
import { UsersEntity } from '../../src/users/users.entity';
import { RolesEntity } from '../../src/roles/roles.entity';

export const createUsers = async (
  connection: Connection,
  roles: RolesEntity[],
): Promise<UsersEntity[]> => {
  let users: UsersEntity[];
  let user: UsersEntity;
  let role: RolesEntity;

  const defaultUsers: UsersEntity[] = await seedDefaultUsers(connection, roles);
  users = [...defaultUsers];

  // Generate 20 random users
  for (let i = 0; i < 20; i++) {
    // Randomly assign role to user
    role = roles[faker.random.number(roles.length - 1)];
    user = generateRandomUser(role);
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values(user)
      .execute();
    users.push(user);
  }

  return users;
};

export const seedDefaultUsers = async (
  connection: Connection,
  roles: RolesEntity[],
): Promise<UsersEntity[]> => {
  const users: UsersEntity[] = [];

  const adminRole = roles.filter(role => role.name === 'ADMIN')[0];
  const userRole = roles.filter(role => role.name === 'USER')[0];

  const defaultAdmin = generateDefaultAdmin(adminRole);
  await connection
    .createQueryBuilder()
    .insert()
    .into(UsersEntity)
    .values(defaultAdmin)
    .execute();
  users.push(defaultAdmin);

  const defaultUser = generateDefaultUser(userRole);
  await connection
    .createQueryBuilder()
    .insert()
    .into(UsersEntity)
    .values(defaultUser)
    .execute();
  users.push(defaultUser);

  return users;
};

const generateRandomUser = (role: RolesEntity): UsersEntity => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const username = faker.internet.userName(firstName, lastName);
  const email = faker.internet.email(firstName, lastName);

  const user = new UsersEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.email = email;
  user.role = role;
  user.password = '12345678';

  return user;
};

const generateDefaultAdmin = (role: RolesEntity): UsersEntity => {
  const user = new UsersEntity();
  user.firstName = 'Admin';
  user.lastName = 'Admin';
  user.username = 'admin';
  user.email = 'admin@localhost.com';
  user.role = role;
  user.password = '12345678';

  return user;
};

const generateDefaultUser = (role: RolesEntity): UsersEntity => {
  const user = new UsersEntity();
  user.firstName = 'User';
  user.lastName = 'User';
  user.username = 'user';
  user.email = 'user@localhost.com';
  user.role = role;
  user.password = '12345678';

  return user;
};
