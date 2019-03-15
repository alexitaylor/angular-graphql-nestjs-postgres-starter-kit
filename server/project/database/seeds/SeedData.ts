import { Connection, createConnection, getRepository } from 'typeorm';
import { createRoles } from './CreateRoles';
import { createUsers, seedDefaultUsers } from './CreateUsers';
import { createMessages } from './CreateMessages'
import chalk from 'chalk';
import { RolesEntity } from '../../src/roles/roles.entity';
import { UsersEntity } from '../../src/users/users.entity';
import { environment } from '../../src/environments/environment';


export class SeedData {
  connection: Connection;
  log = console.log;

  constructor() {}

  async createConnection() {
    try {
      this.log(chalk.green('🏃‍CONNECTING TO DATABASE...'));
      this.connection =  await createConnection();
    }
    catch (error) {
      this.handleError(error, 'Unable to connect to database');
    }
  }

  /**
   * Seed data
   */
  async run() {

    try {
      // Connect to database
      await this.createConnection();

      // Reset database to start with new, fresh data
      await this.resetDatabase();

      // Seed data with mock / fake data
      await this.seedData();

      process.exit(0);
    }
    catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Populate database with mock data
   */
  async seedData() {
    try {
      this.log(chalk.green(`🌱 SEEDING ${environment.production ? 'PRODUCTION' : ''} DATABASE...`));

      const roles: RolesEntity[] = await createRoles(this.connection);
      // Only seed database with fake users if dev or testing environment
      // else create two default users for prod.
      const users: UsersEntity[] = !environment.production
        ? await createUsers(this.connection, roles)
        : await seedDefaultUsers(this.connection, roles);
      // Only seed database with fake messages if dev or testing environment.
      !environment.production && await createMessages(this.connection, users);

      this.log(chalk.green(`✅ SEEDED ${environment.production ? 'PRODUCTION' : ''} DATABASE`));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieve entities metadata
   */
  async getEntities() {
    const entities = [];
    try {
      (await (await this.connection).entityMetadatas).forEach(
        entity => entities.push({name: entity.name, tableName: entity.tableName})
      );
      return entities;
    } catch(error) {
      this.handleError(error, 'Unable to retrieve database metadata');
    }
  };

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  async cleanAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "public"."${entity.tableName}" CASCADE;`);
      }
    } catch (error) {
      this.handleError(error, 'Unable to clean database');
    }
  };

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  async resetDatabase() {
    const entities = await this.getEntities();
    await this.cleanAll(entities);
    //await loadAll(entities);
  };

  private handleError(error: Error, message?: string): void {
    this.log(chalk.bgRed(`🛑 ERROR: ${!!message ? message : 'Unable to seed database'}`));
    throw new Error(`🛑  ${error}`);
    process.exit(1);
  }
}
