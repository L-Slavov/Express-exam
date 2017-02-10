const tweetParser = require('../utilities/tweetParser')
let Tweet = require('../data/Tweet')

module.exports = {
  create: (req, res) => {
    res.render('tweets/create')
  },
  submit: (req, res) => {
    req.body.message = req.body.message.trim()
    if (req.body.message.length < 1) {
      res.render('tweets/create', {globalError: 'Please write a message'})
      return
    }
    tweetParser.parse(req.body.message)
      .then((result) => {
        let tweet = new Tweet({
          message: req.body.message,
          creator: req.user.username,
          tags: result.tags,
          handles: result.handles
        })
        tweet.save()
        res.redirect(303, '/')
        return
      },
      (err) => {
        res.render('tweets/create', {globalError: err})
      })
  },
  like: (req, res) => {
    Tweet.update({'_id': req.body.id}, {$push: {likes: req.user.username}}, () => {
      res.redirect(303, req.body.location)
    })
  },
  dislike: (req, res) => {
    Tweet.update({'_id': req.body.id}, {$pull: {likes: req.user.username}}, () => {
      res.redirect(303, req.body.location)
    })
  },
  update: (req, res) => {
    if (req.body.change === 'update') {
      req.body.message = req.body.message.trim()
      tweetParser.parse(req.body.message)
        .then((result) => {
          Tweet.update({'_id': req.body.id}, {$set: {message: req.body.message, handles: result.handles, tags: result.tags}}, () => {
            res.redirect(303, req.body.location)
            return
          })
        })
    } else if (req.body.change === 'delete') {
      Tweet.remove({'_id': req.body.id}, () => {
        res.redirect(303, req.body.location)
        return
      })
    } else {
      res.status(400).send('Unknown request')
    }
  }
}
