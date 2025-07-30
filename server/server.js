const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://smartbridge-internship.onrender.com',
      'https://smart-bridge-internship.vercel.app'
    ],
    credentials: true
  }
});


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
app.use('/api/admin', require('./routes/complaint'));
app.use('/api/users', require('./routes/complaint'));
app.use('/api/chat', require('./routes/chat'));  

app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});


io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  socket.on('join', ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('sendMessage', ({ sender, receiver, content }) => {
    io.to(receiver).emit('receiveMessage', { sender, content });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
