class Rooms {
	/* 
        userId = socket.id
        roomId = hosts's socket id
    */
	constructor() {
		this.rooms = {};
		this.userMap = {}; // maps socket id to rooms
	}

	addRoom(roomId) {
		if (!this.rooms[roomId]) this.rooms[roomId] = { users: [] };
	}

	addUser(roomId, name, userId) {
		this.rooms[roomId]['users'].push({ name, id: userId, roomId });
		this.userMap[userId] = roomId;
	}

	removeUser(userId) {
		const roomId = this.userMap[userId];
		let _user = null;

		if (roomId) {
			// remove user from the room
			const users = this.rooms[roomId]['users'];
			this.rooms[roomId]['users'] = users.filter((user) => {
				if (user.id === userId) {
					_user = user;
				}
				return user.id !== userId;
			});

			// remove user from the user-room mapping
			delete this.userMap[userId];

			// remove room if applicable
			this.removeRoom(roomId);

			return _user;
		}

		return null;
	}

	removeRoom(roomId) {
		if (this.rooms[roomId]['users'].length === 0) delete this.rooms[roomId];
	}

	getUserList(roomId) {
		const room = this.rooms[roomId];
		if (room) {
			return room['users'];
		}
	}

	showInfo() {
		const rooms = Object.keys(this.rooms);
		rooms.forEach((roomId) => {
			console.log(`Room: ${roomId}`);
			this.rooms[roomId]['users'].forEach((user) => console.log(user));
		});
	}
}

module.exports = new Rooms();
