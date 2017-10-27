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
    async login(_, { email, password }) {

    },

    // Create new user
    async createUser(_, { username, email, password }) {
      const user = await User.create({ username, email, password })

      return user.toJSON()
    },

    // Add a new post
    async addPost(_, { title, content, userId }, { authUser }) {
      const post = await Post.create({
        user_id: userId,
        title,
        slug: slugify(title, { lower: true }),
        content
      })

      return post.toJSON()
    }
  },

  User: {
    // Fetch all posts created by a user
    async posts(user) {
      const posts = await user.posts().fetch()

      return posts.toJSON()
    }
  },

  Post: {
    // Fetch the author of a particular post
    async user(post) {
      const user = await post.user().fetch()

      return user.toJSON()
    }
  }
}

module.exports = resolvers
