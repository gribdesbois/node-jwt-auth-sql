const express = require('express')
const { verifySignUp } = require('../middleware')
const { signin, signup } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  signup)

router.post('/signin', signin)

module.exports = router
