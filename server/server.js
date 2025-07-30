const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://smartbridge-internship.onrender.com',
  'https://smart-bridge-internship.vercel.app'
];


app.use(cors({
  origin: function (origin, callback) {
  
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaint', require('./routes/complaint'));
app.use('/api/admin', require('./routes/complaint'));   // You can split these if needed
app.use('/api/users', require('./routes/complaint'));   // Same controller reused?

app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
