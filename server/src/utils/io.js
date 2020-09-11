const Rooms = require('./Rooms');

exports.setupIO = (io) => {
	io.on('connection', (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on('join', (data) => {
			console.log('joining user', data);
			const { roomId, name, userId } = data;
			socket.join(roomId);
			Rooms.addRoom(roomId);
			Rooms.addUser(roomId, name, userId); // data.userId = socket.id
			Rooms.showInfo();

			// emit to all except the joined user
			socket.broadcast
				.to(roomId)
				.emit('new_connection', { roomId, name, userId });
		});

		socket.on('disconnect', () => {
			console.log('User disconnected');
			Rooms.removeUser(socket.id);
			Rooms.showInfo();
		});
	});
};
