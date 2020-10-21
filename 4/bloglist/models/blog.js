const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: false, default: 'Unknown' },
  url: { type: String, required: true },
  likes: { type: Number, required: false, default: 0 }
})
// from example material at
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#sovelluksen-rakenne
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
