let Tweet = require('../data/Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find({tags: {$elemMatch: {$eq: req.params.name}}})
      .sort({'createdAt': -1})
      .limit(100)
      .then(results => {
        if (!results) {
          res.render('home/index', {globalError: 'Tag not found'})
          return
        }
        res.render('home/index', {tweets: results})
      })
  }
}
