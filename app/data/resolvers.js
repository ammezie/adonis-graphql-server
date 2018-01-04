'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers () {
      const users = await User.all()

      return users.toJSON()
    },

    // Get a user by its ID
    async user (_, { id }) {
      const user = await User.find(id)

      return user.toJSON()
    },

    // Fetch all posts
    async allPosts () {
      const posts = await Post.all()

      return posts.toJSON()
    },

    // Get a post by its slug
    async post (_, { slug }) {
      const post = await Post.findBy('slug', slug)

      return post.toJSON()
    }
  },

  Mutation: {
    // Handles user login
    async login (_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)

      return token
    },

    // Create new user
    async createUser (_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

    // Add a new post
    async addPost (_, { title, content }, { auth }) {
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
        // Throw error if user is not authenticated
        throw new Error('Missing or invalid jwt token')
      }
    }
  },

  User: {
    // Fetch all posts created by a user
    async posts (userInJson) {
      // Convert JSON to model instance
      const user = new User()
      user.newUp(userInJson)

      const posts = await user.posts().fetch()

      return posts.toJSON()
    }
  },

  Post: {
    // Fetch the author of a particular post
    async user (postInJson) {
      // Convert JSON to model instance
      const post = new Post()
      post.newUp(postInJson)

      const user = await post.user().fetch()

      return user.toJSON()
    }
  }
}

module.exports = resolvers
