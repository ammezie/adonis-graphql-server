'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String!
    slug: String!
    content: String!
    user: User!
  }

  type Query {
    allUsers: [User]
    user(id: Int!): User
    allPosts: [Post]
    post(slug: String!): Post
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
    addPost (title: String!, content: String!): Post
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
