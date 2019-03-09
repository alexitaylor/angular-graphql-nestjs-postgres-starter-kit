# GraphQL

## What is GraphQL?

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. --GraphQL Docs

I recommend reading through the [Docs](https://graphql.org/graphql-js/) to learn more about GraphQL.

# Using GraphQL

- Once your server is running visit [http://localhost:4000/graphql](http://localhost:4000/graphql) for GraphQL playground
  - Running the server: `$ npm run start:dev`
- Execute the sign in mutation to grab the JWT token
- In order to Execute all other queries and mutations open the HTTP HEADERS tab on the bottom left corner of the GraphQL playground
- Add your JWT token like so:

```bash
{
  "authorization": "Bearer <yourJwtToken>"
}
```

## Example Queries used in this App

### Query Users

```graphql
query {
  users {
    id
    firstName
    lastName
    username
    email
    createdAt
    role {
      id
      name
    }
  }
}
```

### Query User

```graphql
query {
  user(id: "23441d6f-928f-45eb-ba1c-ed511ffd7ec2") {
    id
    firstName
    lastName
    username
    email
    createdAt
    role {
      id
      name
    }
  }
}
```

### Query Messages (w/ pagination)

```graphql
query {
  messages(page: 1, limit: 20) {
    edges {
      id
      text
      createdAt
    }
    pageInfo {
      page
      limit
    }
  }
}
```

## Example Mutations used in this App

### Sign In

```graphql
mutation {
  signIn(login: "admin", password: "12345678") {
    token
  }
}
```

### Create User

```graphql
mutation {
  createUser(
    createUserInput: {
      firstName: "John"
      lastName: "Smith"
      email: "john@localhost.com"
      username: "johnsmith"
      roleName: "USER"
    }
  ) {
    id
    firstName
    lastName
    username
    email
    createdAt
    updatedAt
  }
}
```

### Create Message

```graphql
mutation {
  createMessage(text: "Hello World!") {
    id
    text
    createdAt
    updatedAt
  }
}
```
