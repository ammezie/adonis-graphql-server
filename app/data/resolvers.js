'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await User.all()

      return users.toJSON()
    },

    // Get a user by it ID
    async fetchUser(_, { id }) {
      return await User.find(id)
    },

    // Fetch all posts
    async allPosts() {
      const posts = await Post.all()

      return posts.toJSON()
    },

    // Get a post by it ID
    async fetchPost(_, { id }) {
      return await Post.find(id)
    }
  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)

      return token
    },

    // Create new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

    // Add a new post
    async addPost(_, { title, content }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check()

        // Get the authenticated user
        const user = await auth.getUser()

        // Add new post
        return await Post.create({
          user_id: user.id,
          title,
          slug: slugify(title, { lower: true }),
          content
        })
      } catch (error) {
        // Throw eeror is user's not authenticated
        throw new Error('Missing or invalid jwt token')
      }
    }
  },

  User: {
    // Fetch all posts created by a user
    async posts(user) {
      const posts = await Post.query()
                              .where('user_id', user.id)
                              .fetch()

      return posts.toJSON()
    }
  },

  Post: {
    // Fetch the author of a particular post
    async user(post) {
      const user = await User.query()
                              .where('id', post.user_id)
                              .first()

      return user.toJSON()
    }
  }
}

module.exports = resolvers
