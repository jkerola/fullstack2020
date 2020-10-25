const bcrypt = require('bcrypt')

function hashPass (password) {
  // hashes password with bcrypt, returns hashed string as promise
  return bcrypt.hash(password, 10)
}

function comparePass (attempt, realPass) {
  return bcrypt.compare(attempt, realPass)
}

function getAuthorizationToken (request) {
  // checks for authoriztion heading, and returns token string or null
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = {
  hashPass,
  comparePass,
  getAuthorizationToken
}
