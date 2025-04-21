const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Enable CORS for frontend URL (https://chatapp-ppfq.onrender.com)
const io = socketIo(server, {
    cors: {
        origin: 'https://chatapp-ppfq.onrender.com',  // Frontend URL
        methods: ['GET', 'POST'],
    },
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (msg) => {
        console.log(`Received message: ${msg}`);
        io.emit('chat message', msg);  // Broadcast message to all clients
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Listen on the correct port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
