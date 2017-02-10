let User = require('mongoose').model('User')

module.exports = {
  all: (req, res) => {
    User.find({}).then(users => {
      res.render('administration/all', {users: users})
    })
  },
  add: (req, res) => {
    if (req.body.change === 'demote') {
      User.update({username: req.body.username}, {$set: {roles: []}}, (err) => {
        if (err) {
          res.render('/administration/all', {globalError: 'Oops 500'})
          return
        }
        res.redirect(303, '/admins/all')
        return
      })
    } else {
      User.update({username: req.body.username}, {$set: {roles: ['Admin']}}, (err) => {
        if (err) {
          res.render('/administration/all', {globalError: 'Oops 500'})
          return
        }
        res.redirect(303, '/admins/all')
        return
      })
    }
  }
}
