'use strict'

const Model = use('Model')

class Post extends Model {
  /**
   * A post belongs to a user.
   *
   * @method user
   *
   * @return {Object}
   */
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
