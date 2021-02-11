const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to database...')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connection accepted!')
  })
  .catch(error => {
    logger.error('Connection failed: ', error.message)
  })

app.use(express.json())
if (process.env.NODE_ENV !== 'test') {
  app.use(logger.morgan(logger.customStyle))
}
app.use(middleware.tokenHandler)
app.use(cors())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
