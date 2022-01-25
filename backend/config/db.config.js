// ! sqlite connection
const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const { DIALECT } = process.env
const { PATH_TO_DB } = process.env

module.exports = {
  dialect: DIALECT,
  storage: PATH_TO_DB,
  /* pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }, */
}
