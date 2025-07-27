const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Signup
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    const user = new User({ fullName, email, password })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    res.status(200).json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router
