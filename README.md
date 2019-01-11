# Angular 7 GraphQL Express Postgres Starter Kit

A full-stack starter kit with Angular 7, GraphQL, Apollo, Express and Postgres

## Features

* Angular (ngx-rocket)
* GraphQL
* Apollo
* Bootstrap 4, ng-bootstrap and Font Awesome
* Node, Express server
* Postgres database with Sequelize
* Authentication w/ JWT and local storage
* Authorization
* E2E testing

## Installation

* `git clone git@https://github.com/alexitaylor/fullstack-apollo-angular-express-starter-kit.git`
* `cd fullstack-apollo-angular-express-starter-kit`

# Client

* `cd client`
* `npm install`
* `npm start`
* visit `http://localhost:4200`

### Get started with these tasks:
- $ npm start: start dev server with live reload on http://localhost:4200
- $ npm run build: build web app for production
- $ npm test: run unit tests in watch mode for TDD
- $ npm run test:ci: lint code and run units tests with coverage
- $ npm run e2e: launch e2e tests
- $ npm run docs: show docs and coding guides
- $ npm run prettier: format your code automatically

# Server

* `cd server`
* `npm install`
* `touch .env`
* fill out *.env file* with postgres env variables
* `npm start`
* optional visit `http://localhost:8000/graphql` for GraphQL playground
