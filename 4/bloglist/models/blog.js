const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: false, default: 0 },
  author: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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
