import io from 'socket.io-client';

export const createConnection = (name, roomId = null) => {
	// create the socket connection with socket server
	return new Promise((resolve) => {
		const socket = io('http://localhost:3005', { path: '/socket' });
		socket.on('connect', () => {
			socket.emit('join', {
				roomId: roomId || socket.id,
				name,
				userId: socket.id,
			});
			resolve(socket);
		});
	});
};
