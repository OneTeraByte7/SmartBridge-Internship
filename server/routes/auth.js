require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET not set in environment variables")
  process.exit(1)
}

router.post('/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full name, email and password are required" })
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'user'  
    })

    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error("Signup error:", err)
    res.status(500).json({ error: 'Registration failed' })
  }
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  try {
    console.log("Login attempt:", email)
    const user = await User.findOne({ email: email.toLowerCase().trim() })
    console.log("User found:", !!user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log("Password match:", isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router
