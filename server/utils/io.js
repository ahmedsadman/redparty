const Rooms = require('./Rooms');
const {
	generateServerMessage,
	generateUserMessage,
} = require('../utils/message');

exports.setupIO = (io) => {
	io.on('connection', (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on('join', (data) => {
			console.log('joining user', data);
			const { roomId, name, userId, videoId } = data;
			console.log(`User ${name} just joined in room ${roomId}`);

			socket.join(roomId);
			Rooms.addRoom(roomId, videoId);
			Rooms.addUser(roomId, name, userId); // data.userId = socket.id
			// Rooms.showInfo();

			// emit to all except the joined user
			socket.broadcast.to(roomId).emit(
				'newMessage',
				generateServerMessage('userJoin', {
					roomId,
					name,
					userId,
				})
			);

			// tell everyone in the room to update their userlist
			io.to(roomId).emit('updateUserList', Rooms.getUserList(roomId));

			// if the user joined existing room, tell him about the playing video
			if (!videoId) {
				const room = Rooms.getRoom(roomId);
				socket.emit(
					'newMessage',
					generateServerMessage('changeVideo', {
						videoId: room.videoId,
					})
				);
			}
		});

		socket.on('createMessage', (message) => {
			const user = Rooms.getUser(socket.id);

			if (user) {
				io.to(user.roomId).emit(
					'newMessage',
					generateUserMessage(user.name, user.id, message)
				);
				console.log('new message received', message);
			}
		});

		socket.on('videoStateChange', (data) => {
			const user = Rooms.getUser(socket.id);
			console.log('videoStateChange trigerred', data);
			// tell others to update the videoState
			socket.broadcast.to(user.roomId).emit(
				'newMessage',
				generateServerMessage('updateVideoState', {
					type: data.type,
					...data.payload,
					user: {
						name: user.name,
						id: socket.id,
					},
				})
			);
		});

		socket.on('changeVideo', (data) => {
			const { videoId } = data;
			const user = Rooms.getUser(socket.id);
			io.to(user.roomId).emit(
				'newMessage',
				generateServerMessage('updateVideoId', { videoId, user })
			);
			Rooms.setVideoId(user.roomId, videoId);
		});

		socket.on('disconnect', () => {
			console.log('User disconnected');
			const user = Rooms.removeUser(socket.id);
			// Rooms.showInfo();
			console.log(`${user.name} has left`);

			io.to(user.roomId).emit(
				'newMessage',
				generateServerMessage('userLeft', {
					name: user.name,
					userId: user.id,
					roomId: user.roomId,
				})
			);

			// tell everyone in the room to update their userlist
			io.to(user.roomId).emit(
				'updateUserList',
				Rooms.getUserList(user.roomId)
			);
		});
	});
};
