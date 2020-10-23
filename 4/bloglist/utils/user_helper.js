const bcrypt = require('bcrypt')

function hashPass (password) {
  // hashes password with bcrypt, returns hashed string as promise
  return bcrypt.hash(password, 10)
}

module.exports = {
  hashPass
}
