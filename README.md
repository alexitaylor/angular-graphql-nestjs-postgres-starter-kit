# Angular 7 + GraphQL + NestJS + Postgres Starter Kit

A full-stack starter kit with Angular 7, GraphQL, Apollo, NestJS and Postgres

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
- E2E testing
- Docker Compose

## Requirements

- Node
- NPM
- Postgres
- Docker (not required)

## Installation

- `git clone git@https://github.com/alexitaylor/angular-graphql-express-postgres-starter-kit.git`
- `cd angular-graphql-express-postgres-starter-kit`

# Client

- `cd client`
- `npm install`
- `npm start`
- visit `http://localhost:4200`

### Get started with these tasks:

- $ npm start: start dev server with live reload on http://localhost:4200
- $ npm run build: build web app for production
- $ npm test: run unit tests in watch mode for TDD
- $ npm run test:ci: lint code and run units tests with coverage
- $ npm run e2e: launch e2e tests
- $ npm run docs: show docs and coding guides
- $ npm run prettier: format your code automatically

# Server

## Installation

```bash
$ cd server
$ npm install
```

### Required for Docker

Fill out _.env file_ with postgres env variables

`bash $ touch .env`

### Find default Postgres Database Configs

- Navigate to `server/project/ormconfig.json` file

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
