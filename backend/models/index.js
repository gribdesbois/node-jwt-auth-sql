const Sequelize = require('sequelize')
const config = require('../config/db.config')

const sequelize = new Sequelize(config)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model')(sequelize, Sequelize)
db.role = require('./role.model')(sequelize, Sequelize)
db.refreshToken = require('./refreshToken.model')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id',
})

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id',
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
