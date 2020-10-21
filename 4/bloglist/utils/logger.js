const morgan = require('morgan')

morgan.token('content', (req) => { // custom MORGAN token for logging purposes
  if (req.body && req.method === 'POST') {
    return '\n' + JSON.stringify(req.body)
  } else {
    return ' ' // empty string if no body content, keeps console clean
  }
})

const customStyle = ':method :url :status :res[content-length] - :response-time ms :content'

// from example at
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#sovelluksen-rakenne
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info, error, morgan, customStyle
}
