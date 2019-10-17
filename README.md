# 🚀Angular 8 + GraphQL + NestJS + Postgres Starter Kit

A full-stack starter kit with Angular 8, GraphQL, Apollo, NestJS and Postgres.

Starting a new web app can be hard. Choosing the right technologies, architecting the foundation and developing the core of an application can take a lot of time. Setting up a back-end and front-end requires a substantial amount of work. Furthermore, if you don't do things correctly, it can create technical debt, painless refactoring, and maintenance hell. We take care of all the tedious, mundane setup process for you.

This stater kit provides you with a kick start to your project by providing a scalable, modular web app with features like sign up and log in, user management, easy database configuration and more. We carefully curated cutting-edge technologies for a full-stack application. View the full list of features below.

Happy Coding :)

<a href="https://www.buymeacoffee.com/dyMHPEW" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Features

- [Angular 8.X](https://angular.io/) (w/ [TypScript](https://www.typescriptlang.org/))
- [GraphQL](https://graphql.org/)
- [NestJS](https://nestjs.com/) server
- [TypeORM](https://typeorm.io/#/)
- [Apollo](https://www.apollographql.com/)
- [Bootstrap 4](https://getbootstrap.com/)
- [Postgres](https://www.postgresql.org/)
- Authentication w/ [JWT](https://jwt.io/) and [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- Authorization
- User Management
- Entity Management
- E2E testing
- [Docker](https://www.docker.com/) Compose

<a name="tableofcontents"></a>

# Table of Contents

- [Requirements](#requirements)
- [Getting Started](#gettingstarted)
- [Installation](#installation)
- [Client](#client)
- [Server](#server)
- [Contributing](#contributing)
- [Cheat Sheets](#cheatsheets)
- [TODO](#todo)

<a name="gettingstarted"></a>

# [⬆️](#tableofcontents) Getting Started

<a name="requirements"></a>

## [⬆️](#tableofcontents) Requirements

Follow [this guide](.github/MAC_DEV_ENV_SETUP.md) to setup your mac dev environment.

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional)

<a name="installation"></a>

## [⬆️](#tableofcontents) Installation

- Fork the repo
- `git clone git@https://github.com/<yourusername>/angular-graphql-express-postgres-starter-kit.git`
- `cd angular-graphql-express-postgres-starter-kit`
- `git remote add upstream git@https://github.com/alexitaylor/angular-graphql-express-postgres-starter-kit.git`

<a name="client"></a>

# [⬆️](#tableofcontents) Client

- `cd client`
- `npm install`
- `npm start`
- visit `http://localhost:4200`

### Get started with these tasks:

- \$ npm start: start dev server with live reload on [http://localhost:4200](http://localhost:4200)
- \$ npm run build: build web app for production
- \$ npm test: run unit tests in watch mode for TDD
- \$ npm run test:ci: lint code and run units tests with coverage
- \$ npm run e2e: launch e2e tests
- \$ npm run docs: show docs and coding guides
- \$ npm run prettier: format your code automatically

<a name="server"></a>

# [⬆️](#tableofcontents) Server

## Installation

```bash
$ cd server/project
$ npm install
```

### Create Database

- Required only initial setup
- Find default Postgres Database Configs by navigating to `server/project/ormconfig.json` file
- Connect to Postgres shell: `psql postgres`
- Create database:

```bash
postgres=# create database nest_graphql_test;
CREATE DATABASE
```

- If `postgres` user does not exist: 1. [Create a new user](https://www.postgresql.org/docs/8.0/sql-createuser.html) and 2. [Change user's role](https://chartio.com/resources/tutorials/how-to-change-a-user-to-superuser-in-postgresql/)

### Seed Database

- Run the following command to seed your database with default and random generated data:

```bash
$ npm run seedData
```

- **_WARNING:_** Running this file will **_DELETE ALL_** data in your database and re-generate and insert new, random.
- **_BE CAREFUL_** running this command in **_production env_**. It will delete all production data. The script will check if the environment you're running in is production or not by checking `server/project/src/environments/environment.ts` file configs. If environment.production config is set to true, then the seeding process will only generate default roles and 2 default users. This is useful when first setting up your production environment.

## Running the server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- Visit [http://localhost:4000/graphql](http://localhost:4000/graphql) for GraphQL playground
- Getting Started with GraphQL visit [here](.github/GRAPHQL.md)

### Required for Docker

Fill out _.env file_ with postgres env variables

`bash $ touch .env`

```text
POSTGRES_PASSWORD=supersecret
POSTGRES_USER=user
POSTGRES_DB=db

DATABASE=db
DATABASE_USER=user
DATABASE_PASSWORD=supersecret
DATABASE_HOST=postgres
DATABASE_PORT=5432
```

<a name="contributing"></a>

# [⬆️](#tableofcontents) Contributing

Anyone is welcome to [contribute](.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](.github/CONTRIBUTING.md):

- [Bug reports](.github/CONTRIBUTING.md#bugs)
- [Feature requests](.github/CONTRIBUTING.md#features)
- [Pull requests](.github/CONTRIBUTING.md#pull-requests)

<a name="cheatsheets"></a>

# [⬆️](#tableofcontents) Cheat Sheets

- [Postgres](.github/POSTGRES_COMMANDS.md)
- [Docker](.github/DOCKER_COMMANDS.md)
- [GraphQL](.github/GRAPHQL.md)
- [Mac Dev Env Setup](.github/MAC_DEV_ENV_SETUP.md)

<a name="todo"></a>

### [⬆️](#tableofcontents) TODO:

- [x] Implement TypeORM migrations and default data on initial setup
- [ ] Write Docker setup and configuration README
- [ ] More tests
- [ ] Entity Generator (able to create BE and FE models, GraphQL queries/mutations and some FE boilerplate code from an defined entity.
