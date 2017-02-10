let homeController = require('./home-controller')
let usersController = require('./users-controller')
let tweetController = require('./tweet-controller')
let tagController = require('./tag-controller')
let AdminController = require('./admin-controller')

module.exports = {
  home: homeController,
  users: usersController,
  tweets: tweetController,
  tags: tagController,
  admin: AdminController
}
