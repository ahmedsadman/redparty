import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import Topbar from '../common/Topbar';
import Player from './Player';
import Chat from './Chat/Chat';
import { createConnection } from '../../utils/socket';
import { UserContext } from '../../contexts/UserContext';

function Room(props) {
	const [isHost, setHost] = useState(false);
	const [socket, setSocket] = useState(null);
	const { dispatch, userData } = useContext(UserContext);

	let _isHost = false;
	let _socket = null;

	useEffect(() => {
		console.log(props);
		init();
	}, []);

	const init = async () => {
		const hostId = props.location.state && props.location.state.hostId;
		const videoId = props.location.state && props.location.state.videoId;
		let username = props.location.state && props.location.state.username;

		if (!hostId) {
			// Not a host
			// ask for username
			const usernamePrompt = await Swal.fire({
				title: 'Enter your display name',
				input: 'text',
				allowOutsideClick: false,
			});
			username = usernamePrompt.value;
			const roomId = props.match.params.id;
			_socket = await createConnection(username, roomId);
			console.log('not host');

			// doesn't have video id, need to be fetched from server
		} else {
			_isHost = true;
			_socket = props.location.socket;
			console.log('host');

			// update videoid in global context
			dispatch({ type: 'UPDATE_VIDEO_ID', videoId });
		}

		// update username in global context
		dispatch({ type: 'UPDATE_USERNAME', username });

		setHost(_isHost);
		setSocket(_socket);
		bindEvents();
		console.log('video id: ', videoId);
	};

	const showToast = (icon, text) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
		});

		Toast.fire({
			icon,
			title: text,
		});
	};

	const dispatchAdminMessage = (id, text) => {
		dispatch({
			type: 'UPDATE_MESSAGES',
			data: {
				from: null,
				text,
				id,
			},
		});
	};

	const bindEvents = () => {
		if (!_socket) return;

		_socket.on('newMessage', (data) => {
			switch (data.type) {
				case 'userJoin':
					showToast(
						'success',
						`${data.payload.name} has joined the room`
					);
					const { name } = data.payload;
					dispatchAdminMessage(data.id, `${name} has joined`);
					break;

				case 'userLeft':
					showToast('info', `${data.payload.name} has left the room`);
					const { name } = data.payload;
					dispatchAdminMessage(data.id, `${name} has left`);
					break;

				case 'userMessage':
					dispatch({ type: 'UPDATE_MESSAGES', data });
					break;

				case 'changeVideo':
					dispatch({
						type: 'UPDATE_VIDEO_ID',
						videoId: data.payload.videoId,
					});
					break;

				default:
					break;
			}
		});

		_socket.on('updateUserList', (userList) => {
			console.log('new user list', userList);
			dispatch({ type: 'UPDATE_USER_LIST', users: userList });
		});
	};

	return (
		<React.Fragment>
			<Topbar />
			<Container fluid style={{ margin: '0 3%' }}>
				<Row>
					<Col md={8}>
						<Player socket={socket} videoId={userData.videoId} />
					</Col>
					<Col md={4}>
						<Chat socket={socket} />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Room;
