let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')
let Tweet = require('../data/Tweet')
module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body

    if (user.password !== user.confirmPassword) {
      user.globalError = 'Passwords do not match!'
      res.render('users/register', user)
    } else {
      user.salt = encryption.generateSalt()
      user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

      User
        .create(user)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/register', { globalError: 'Ooops 500' })
              return
            }

            res.redirect('/')
          })
        })
    }
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user.authenticate(inputUser.password)) {
          res.render('users/login', { globalError: 'Invalid username or password' })
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/login', { globalError: 'Ooops 500' })
              return
            }

            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    User.findOne({username: req.params.name})
    .then(user => {
      Tweet.find({$or: [{creator: req.params.name}, {handles: {$elemMatch: {$eq: req.params.name}}}]})
      .sort({'createdAt': -1})
      .limit(100)
      .then(tweets => {
        res.render('users/profile', {User: user, tweets: tweets, page: '/profile/' + req.params.name})
      })
    })
  }
}
