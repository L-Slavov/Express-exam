const Tweet = require('../data/Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find({})
      .sort({'createdAt': -1})
      .limit(100)
      .then(results => {
        res.render('home/index', {tweets: results})
      })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
