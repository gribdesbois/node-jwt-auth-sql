const db = require('../models')

const { ROLES } = db
const User = db.user

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body
  // Username
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        User.findOne({ where: { email } })
          .then((user) => {
            if (user) {
              return res.status(400).send({ message: 'Failed! Email already in use!' })
              return null
            }
            next()
          })
      } else {
        return res.status(400).send({ message: 'Failed! Username is already in use!' })
        return null
      }
      // eslint-disable-next-line no-useless-return
    })
    /* .catch((err) => res.status(500).json({ error: new Error(`${err}`) })) */

  // Email

  /* .catch((err) => res.status(500).json({ error: new Error(`${err}`) })) */
}

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).send({ message: `Failed! Role does not exist = ${roles[i]}` })
        return null
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
