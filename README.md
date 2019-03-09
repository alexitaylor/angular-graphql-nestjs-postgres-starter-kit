# Angular 7 + GraphQL + NestJS + Postgres Starter Kit

A full-stack starter kit with Angular 7, GraphQL, Apollo, NestJS and Postgres.

Starting a new web app can be hard. Choosing the right technologies, architecting the foundation and developing the core of an application can take a lot of time. Setting up a back-end and front-end requires a substantial amount of work. Furthermore, if you don't do things correctly, it can create technical debt, painless refactoring, and maintenance hell. We take care of all the tedious, mundane setup process for you.

This project provides you with a kick start to your project by providing a scalable, modular web app with features like sign up and log in, user management, easy database configuration and more. We carefully curated cutting-edge technologies for a full-stack application. View the full list of features below.

Happy Coding :)

## Features

- Angular (ngx-rocket)
- GraphQL
- NestJS server
- TypeORM
- Apollo
- Bootstrap 4, ng-bootstrap and Font Awesome
- Postgres
- Authentication w/ JWT and local storage
- Authorization
- User Management
- Entity Management
- E2E testing
- Docker Compose

## Requirements

- Node
- NPM
- Postgres
- Docker (optional)

## Installation

- `git clone git@https://github.com/alexitaylor/angular-graphql-express-postgres-starter-kit.git`
- `cd angular-graphql-express-postgres-starter-kit`

# Client

- `cd client`
- `npm install`
- `npm start`
- visit `http://localhost:4200`

### Get started with these tasks:

- $ npm start: start dev server with live reload on [http://localhost:4200](http://localhost:4200)
- $ npm run build: build web app for production
- $ npm test: run unit tests in watch mode for TDD
- $ npm run test:ci: lint code and run units tests with coverage
- $ npm run e2e: launch e2e tests
- $ npm run docs: show docs and coding guides
- $ npm run prettier: format your code automatically

# Server

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

## Running the server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Visit `http://localhost:4000/graphql` for GraphQL playground

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

## Contributing

Hundreds of developers have helped to make the HTML5 Boilerplate. Anyone is welcome to [contribute](.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](.github/CONTRIBUTING.md):

- [Bug reports](.github/CONTRIBUTING.md#bugs)
- [Feature requests](.github/CONTRIBUTING.md#features)
- [Pull requests](.github/CONTRIBUTING.md#pull-requests)

### TODO:

- [ ] Implement TypeORM migrations and default data on initial setup
- [ ] Write Docker setup and configuration README
- [ ] More tests
