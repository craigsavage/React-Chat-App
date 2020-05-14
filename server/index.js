const express = require('express'),
      app     = express();

const http = require('http').createServer(app),
      io   = require('socket.io')(http),
      cors = require('express');

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

// Routes
const router = require('./router/router');

app.use(router);

// Socket
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        
        const error = true;

        if(error) {
            callback({ error: 'error' })
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// SERVER
const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
    console.log(`Server successfully started on port: ${PORT}`);
})