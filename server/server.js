const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const complaintRoutes = require('./routes/complaint')
const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  origin:'https://smartbridge-internship.onrender.com',
  origin:'https://smart-bridge-internship.vercel.app/',
  credentials: true,
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', require('./routes/auth'))

// Remove or rename if not a route file
// app.use('/api', require('./routes/middleware'))

// Fix route path to plural to match frontend
app.use("/api/complaint", require('./routes/complaint'))
app.use("/api/admin", require('./routes/complaint'));
app.use("/api/users", require('./routes/complaint'));



app.get('/', (req, res) => {
  res.send('API is running...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
