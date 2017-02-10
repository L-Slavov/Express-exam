const mongoose = require('mongoose')

let tweetSchema = mongoose.Schema({
  message: {type: String, maxlength: 140},
  creator: {type: String},
  tags: [{type: String}],
  handles: [{type: String}],
  likes: [{type: String}],
  views: {type: Number, default: 0}
}, {timestamps: true})

tweetSchema.post('init', function (result, next) {
  result.views = result.views + 1
  result.save(() => {
    next()
  })
})

module.exports = mongoose.model('Tweet', tweetSchema)
