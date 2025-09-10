const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

// Initialize app first ✅
const app = express();
app.use(cors());
app.use(express.json());

// Create server and attach socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // change to frontend domain in production
    methods: ["GET", "POST"]
  }
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room for a specific repair request chat
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for new messages and broadcast to others in the room
  socket.on('sendMessage', (data) => {
    // Data: { repairRequestId, senderId, receiverId, message }
    io.to(data.repairRequestId).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/repairs', require('./routes/repairRoutes'));
app.use('/api/repairs/shop', require('./routes/repairShopRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
