const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
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
app.use(logger.morgan(logger.customStyle))
app.use(cors())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
