const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', socket => {
  console.log('A user connected');

  // Listen for incoming messages
  socket.on('message', async ({ message, uid }) => {
    try {
      const response = await axios.get(`https://chatbot-api.vercel.app/api/?message=${message}&user=${uid}`);
      const botMessage = response.data.message;
      socket.emit('message', { message: botMessage, messageType: 'bot-message' });
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
