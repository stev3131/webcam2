const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let roomId = 2121;

app.get('/', (req, res) => {
	res.redirect(`/room/?roomId=${roomId}`);
});

app.get('/room', (req, res, next) => {
	res.sendFile(__dirname + '/html/index.html');
});

app.get('/js/webcam.js', (req, res) => {
	 res.sendFile(__dirname + '/js/webcam.js');
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) =>{
			socket.join(roomId)
    	socket.to(roomId).broadcast.emit('user-connected', userId)

			socket.on('disconnect', () => {
      	socket.to(roomId).broadcast.emit('user-disconnected', userId)
    	})
		});
});

server.listen(3000,function(){
	console.log("Server is running");
});
