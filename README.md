# Angular 7 + GraphQL + NestJS + Postgres Starter Kit

A full-stack starter kit with Angular 7, GraphQL, Apollo, NestJS and Postgres

## Features

- Angular (ngx-rocket)
- GraphQL
- Apollo
- Bootstrap 4, ng-bootstrap and Font Awesome
- NestJS server
- TypeORM
- Postgres database with Sequelize
- Authentication w/ JWT and local storage
- Authorization
- E2E testing
- Docker Compose

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

- `cd server`
- `npm install`
- `touch .env`
- fill out _.env file_ with postgres env variables
- `npm run start:dev`
- optional visit `http://localhost:4000/graphql` for GraphQL playground
