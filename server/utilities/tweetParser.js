let User = require('mongoose').model('User')

module.exports = {
  parse: (message) => {
    return new Promise((resolve, reject) => {
      let tags = message.match(/#\w+/g)
      let handles = message.match(/@\w+/g)

      for (let handle in handles) {
        handles[handle] = handles[handle].replace('@', '')
      }
      for (let tag in tags) {
        tags[tag] = tags[tag].replace('#', '')
      }
      if (handles) {
        User
        .count({username: {$in: handles}})
        .then(count => {
          if (count !== handles.length) reject('The handle you tried to enter does not exist')
          resolve({tags: tags, handles: handles})
        })
      } else {
        // If handles or tags are empty it will sign null in the database
        resolve({tags: tags, handles: handles})
      }
    })
  }
}
