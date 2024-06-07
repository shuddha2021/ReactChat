const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
        console.log('Received message:', data);
        const timestamp = new Date().toLocaleTimeString(); // Get the current time
        const messageWithTimestamp = { text: data, timestamp };

        io.emit('message', messageWithTimestamp); // Broadcast the received message with timestamp
        setTimeout(() => {
            io.emit('message', { text: `Server: You said "${data}"`, timestamp });
        }, 500); // Respond with a message after 500ms with timestamp
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
