const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');  // Chat message model
const Document = require('./models/editor'); // Editor document model
const Login = require('./router/login');  // Authentication routes
const Project = require('./router/project'); // Project routes
const Editor = require('./router/editor');  // Editor routes
const connectDB = require('./db');  // MongoDB connection

// Initialize Express app and server
const app = express();
const server = http.createServer(app);

// Setup CORS
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend URL
  methods: ['GET', 'POST','PUT','DELETE']
};

app.use(cors(corsOptions));  // Apply CORS settings
app.use(express.json());  // Parse JSON

// Connect to MongoDB
connectDB();

// Use the routes
app.use('/', Login);
app.use('/', Project);
app.use('/', Editor);

// Initialize Socket.io and use the same CORS options for WebSockets
const io = socketIo(server, {
  cors: corsOptions
});

// Handle both chat and collaborative document editing with the same socket.io instance

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Chat feature
  socket.on('join', (userId) => {
    console.log(`User ${userId} has joined`);
    socket.join(userId); // Join the user's specific room
  });

  socket.on('send-message', async (data) => {
    const { sender, receiver, content } = data;
    const message = new Message({ sender, receiver, content });
    try {
      await message.save();  // Save message to MongoDB
      io.to(receiver).emit('receive-message', message);  // Send message to receiver
      io.to(sender).emit('message-sent', message);  // Confirm sent message to sender
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Document collaboration feature
  socket.on('join-room', async (documentId) => {
    socket.join(documentId);  // Join room for specific document

    // Fetch and send the document to the user
    const document = await Document.findById(documentId);
    if (document) {
      socket.emit('load-document', document.content);
    }

    // Broadcast changes to other users in the same room
    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    // Save document periodically every 5 seconds
    const saveInterval = setInterval(async () => {
      await Document.findByIdAndUpdate(documentId, { content: document.content, lastModified: Date.now() });
    }, 5000);

    // Handle explicit document save request
    socket.on('save-document', async (content) => {
      await Document.findByIdAndUpdate(documentId, { content, lastModified: Date.now() });
    });

    // Clean up on user disconnect
    socket.on('disconnect', () => {
      clearInterval(saveInterval);
      console.log('User disconnected:', socket.id);
    });
  });
});

// Get chat history between two users
app.get('/messages/:userId/:receiverId', async (req, res) => {
  const { userId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).sort('timestamp'); // Sort messages by timestamp
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
