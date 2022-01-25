const dotenv = require('dotenv')

dotenv.config()

const { JWT_TOKEN_SECRET } = process.env

module.exports = {
  secret: JWT_TOKEN_SECRET,
}
