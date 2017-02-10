const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)
  app.get('/profile/:name', auth.isAuthenticated, controllers.users.profile)

  app.get('/tweet/create', auth.isAuthenticated, controllers.tweets.create)
  app.post('/tweet/create', auth.isAuthenticated, controllers.tweets.submit)
  app.post('/tweet/like', auth.isAuthenticated, controllers.tweets.like)
  app.post('/tweet/dislike', auth.isAuthenticated, controllers.tweets.dislike)
  app.post('/tweet/update', auth.isInRole('Admin'), controllers.tweets.update)

  app.get('/tag/:name', controllers.tags.index)

  app.get('/admins/all', auth.isInRole('Admin'), controllers.admin.all)
  app.post('/admins/add', auth.isInRole('Admin'), controllers.admin.add)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
