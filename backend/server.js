const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { seedDatabase } = require('./utils/dataGenerator');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection & Synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL via Sequelize');
    return sequelize.sync(); // Sync all models
  })
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      seedDatabase();
    }
  })
  .catch(err => console.error('MySQL connection error:', err));

// WebSocket setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('socketio', io);

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'CyberShield AI Backend is running' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/threats', require('./routes/threats'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
