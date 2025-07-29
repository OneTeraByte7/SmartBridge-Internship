const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/dashboard', authMiddleware, (req, res) => {
  // Access user info from token
  const user = req.user
  res.json({ message: 'Welcome to your dashboard', user })
})

module.exports = router
