const express = require('express'),
      app     = express();

const http = require('http').createServer(app),
      io   = require('socket.io')(http),
      cors = require('express');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

// Routes
const router = require('./router/router');

app.use(router);

// Socket
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        // Returns an error if username is taken
        if(error) return callback(error);
        console.log('HI')
        // Emit ~ To just the user
        socket.emit('message', { user: 'admin', text: `Hi ${user.name}! Welcome to ${user.room}!` });
        
        // Broadcast ~ To everyone but the user 
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has join the chat!` });

        socket.join(user.room)  // Adds user to the room

        callback();
    });

    // Sends message to the entire room
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', { user: user.name, text: message });
        

        callback();
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