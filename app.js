const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');  
const Document = require('./models/editor'); 
const Login = require('./router/login');  
const Project = require('./router/project'); 
const Editor = require('./router/editor');  
const connectDB = require('./db');  

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST','PUT','DELETE']
};

app.use(cors(corsOptions));  
app.use(express.json());  

connectDB();

app.use('/', Login);
app.use('/', Project);
app.use('/', Editor);

const io = socketIo(server, {
  cors: corsOptions
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    console.log(`User ${userId} has joined`);
    socket.join(userId); 
  });

  socket.on('send-message', async (data) => {
    const { sender, receiver, content } = data;
    const message = new Message({ sender, receiver, content });
    try {
      await message.save();  
      io.to(receiver).emit('receive-message', message);  
      io.to(sender).emit('message-sent', message);  
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('join-room', async (documentId) => {
    socket.join(documentId);  
    const document = await Document.findById(documentId);
    if (document) {
      socket.emit('load-document', document.content);
    }

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    const saveInterval = setInterval(async () => {
      await Document.findByIdAndUpdate(documentId, { content: document.content, lastModified: Date.now() });
    }, 5000);

    socket.on('save-document', async (content) => {
      await Document.findByIdAndUpdate(documentId, { content, lastModified: Date.now() });
    });

    socket.on('disconnect', () => {
      clearInterval(saveInterval);
      console.log('User disconnected:', socket.id);
    });
  });
});

app.get('/messages/:userId/:receiverId', async (req, res) => {
  const { userId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).sort('timestamp'); 
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
