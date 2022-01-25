const db = require('../models')

const { ROLES } = db
const User = db.user

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body
  // Username
  User.findOne({ where: { username } })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: 'Failed! Username is already in use!' })
      }
    })
    .catch((err) => res.status(500).json({ error: new Error(`${err}`) }))

  // Email
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: 'Failed! Email already in use!' })
        return
      }
      next()
    })
    .catch((err) => res.status(500).json({ error: new Error(`${err}`) }))
}

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(400).send({ message: `Failed! Role does not exist = ${roles[i]}` })
        return
      }
    }
  }
  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
}

module.exports = verifySignUp
