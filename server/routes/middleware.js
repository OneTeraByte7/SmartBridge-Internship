const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/dashboard', authMiddleware, (req, res) => {
  const user = req.user
  res.json({ message: 'Welcome to your dashboard', user })
})

module.exports = router
