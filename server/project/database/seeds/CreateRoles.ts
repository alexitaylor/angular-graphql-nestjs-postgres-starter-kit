import { Connection } from "typeorm";
import { RolesEntity } from '../../src/roles/roles.entity';

export const createRoles = async (connection: Connection): Promise<RolesEntity[]> => {
  const roles: RolesEntity[] = [];

  const roleAdmin = new RolesEntity();
  roleAdmin.name = 'ADMIN';

  await connection.createQueryBuilder().insert().into(RolesEntity).values(roleAdmin).execute();
  roles.push(roleAdmin);

  const roleUser = new RolesEntity();
  roleUser.name = 'USER';

  await connection.createQueryBuilder().insert().into(RolesEntity).values(roleUser).execute();
  roles.push(roleUser);

  return roles;
};
