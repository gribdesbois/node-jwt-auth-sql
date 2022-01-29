const dotenv = require('dotenv')

dotenv.config()

const { JWT_TOKEN_SECRET } = process.env

module.exports = {
  secret: JWT_TOKEN_SECRET,
  /* jwtExpiration: 60 * 60, // 1 hour
  jwtRefeshExpiration: 60 * 60 * 24, // 24 hours */

  /* for test */
  jwtExpiration: 60, // 1 minute
  jwtRefreshExpiration: 120, // 2 minutes
}
