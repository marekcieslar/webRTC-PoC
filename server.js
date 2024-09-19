const fs = require('fs');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(
  // {
  //   key: fs.readFileSync('../cert/cert.key'),
  //   cert: fs.readFileSync('../cert/cert.crt'),
  // },
  app
);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on https://${HOST}:${PORT}`);
});
