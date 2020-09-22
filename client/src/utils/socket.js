import io from 'socket.io-client';
import { showToast } from '../utils/helper';

export const createConnection = (name, roomId = null, videoId = null) => {
	// create the socket connection with socket server
	return new Promise((resolve) => {
		const socket = io(process.env.REACT_APP_SERVER, { path: '/socket' });
		socket.on('connect', () => {
			socket.emit('join', {
				roomId: roomId || socket.id,
				name,
				userId: socket.id,
				videoId,
			});
			resolve(socket);
		});
	});
};

export const bindSocketEvents = (socket, dispatchFunc) => {
	if (!socket) return;
	const { userDispatch, signalDispatch } = dispatchFunc;

	const dispatchAdminMessage = (id, text) => {
		userDispatch({
			type: 'UPDATE_MESSAGES',
			data: {
				from: null,
				text,
				id,
			},
		});
	};

	socket.on('newMessage', (data) => {
		const name = data.payload && data.payload.name;

		switch (data.type) {
			case 'userJoin':
				showToast(
					'success',
					`${data.payload.name} has joined the room`
				);
				dispatchAdminMessage(data.id, `${name} has joined`);
				break;

			case 'userLeft':
				showToast('info', `${data.payload.name} has left the room`);
				dispatchAdminMessage(data.id, `${name} has left`);
				break;

			case 'userMessage':
				userDispatch({ type: 'UPDATE_MESSAGES', data });
				break;

			case 'changeVideo':
				userDispatch({
					type: 'UPDATE_VIDEO_ID',
					videoId: data.payload.videoId,
				});
				break;

			case 'updateVideoState':
				signalDispatch({
					type: 'SET_TRANSITION',
					transition: true,
				});
				switch (data.payload.type) {
					case 'PLAY':
						signalDispatch({
							type: 'PLAY_VIDEO',
							currentTime: data.payload.currentTime,
						});
						showToast(
							'info',
							`${data.payload.user.name} has started playing the video`,
							'bottom-start'
						);
						break;

					case 'PAUSE':
						signalDispatch({
							type: 'PAUSE_VIDEO',
							timestamp: Date.now(),
						});
						showToast(
							'info',
							`${data.payload.user.name} has paused the video`,
							'bottom-start'
						);
						break;

					default:
						break;
				}

			default:
				break;
		}
	});

	socket.on('updateUserList', (userList) => {
		console.log('new user list', userList);
		userDispatch({ type: 'UPDATE_USER_LIST', users: userList });
	});
};
