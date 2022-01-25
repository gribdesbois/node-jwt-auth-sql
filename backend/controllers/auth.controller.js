const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../models')
const config = require('../config/auth.config')

const User = db.user
const Role = db.role
const { Op } = db.Sequelize

exports.signup = (req, res) => {
  const { username, email } = req.body
  const password = bcrypt.hashSync(req.body.password, 10)
  // Save User to DB
  User.create({ username, email, password })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully' })
          })
        })
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully' })
        })
      }
    })
    .catch((err) => { res.status(500).send({ message: err.message }) })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      )
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      })
      const authorities = []
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(`ROLE_${roles[i].name.toUpperCase()}`)
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
