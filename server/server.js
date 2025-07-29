const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const complaintRoutes = require('./routes/complaint') 
const app = express()

// CORS Middleware — restrict to your frontend origin
app.use(cors({
  origin: 'http://localhost:3000', // Change to your deployed frontend URL
  credentials: true,
}))

// JSON body parser middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// API Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api', require('./routes/middleware'))
app.use("/api/complaint", require('./routes/complaint'))



// Health check route
app.get('/', (req, res) => {
  res.send('API is running...')
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
