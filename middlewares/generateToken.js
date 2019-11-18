const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
  const payload = {
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  const result = jwt.sign(
    payload,
    'secret key',
    options
  )

  return result;
}